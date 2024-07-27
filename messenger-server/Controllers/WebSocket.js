import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import config from "config";
import MessageModel from "../Models/MessageModel.js";

const initializeWebSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true,
        }
    });

    io.on("connection", (socket) => {
        console.log("Socket connected");

        const token = socket.handshake.query.token;
        if (!token) {
            console.log("Connection without token, disconnecting...");
            socket.disconnect();
            return;
        }

        let userId;
        try {
            const decoded = jwt.verify(token, config.get('jwtSecret'));
            userId = decoded._id;
            console.log(`User ${userId} connected`);
            socket.join(userId);
        } catch (error) {
            console.log("Invalid token, disconnecting...", error.message);
            socket.disconnect();
            return;
        }

        socket.on('getMessages', async ({ conversationId }) => {
            try {
                const messages = await MessageModel.find({ conversationId });
                socket.emit('messages', messages);
            } catch (error) {
                console.error('Error fetching messages:', error);
                socket.emit('error', 'Error fetching messages');
            }
        });

        socket.on('sendMessage', async ({ receiverId, content }) => {
            console.log('sendMessage event received:', { receiverId, content });

            if (!receiverId || !content) {
                socket.emit('error', 'Invalid message parameters');
                return;
            }

            try {
                const message = new MessageModel({
                    senderId: userId,
                    receiverId,
                    content,
                    createdAt: new Date().toISOString()
                });
                await message.save();

                io.to(receiverId).emit('receiveMessage', message);
                socket.emit('messageSent', message);
            } catch (error) {
                console.error('Error saving message:', error);
                socket.emit('error', 'Error saving message');
            }
        });

        socket.on('markAsRead', async ({ messageId }) => {
            try {
                const message = await MessageModel.findById(messageId);
                if (!message) {
                    socket.emit('error', 'Message not found');
                    return;
                }

                message.read = true;
                await message.save();

                io.to(message.senderId).emit('messageRead', message);
            } catch (error) {
                console.error('Error marking message as read:', error);
                socket.emit('error', 'Error marking message as read');
            }
        });

        socket.on('disconnect', () => {
            console.log(`User ${userId} disconnected`);
        });
    });
};

export default initializeWebSocket;