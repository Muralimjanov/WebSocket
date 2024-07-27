import { Schema, model, Types } from "mongoose";

const MessageSchema = new Schema({
    senderId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

MessageSchema.index({ senderId: 1, receiverId: 1 });

const MessageModel = model("Message", MessageSchema);

export default MessageModel;