import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveMessage, sendMessage } from '../../Redux/Actions/chatActions';
import Message from '../Message/Message';
import MessageInput from '../MessageInput/MessageInput';
import './Chat.css';

const Chat = () => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.chat.messages);
  const userId = useSelector(state => state.user.id);
  const [message, setMessage] = React.useState('');

  useEffect(() => {
    dispatch(receiveMessage());
  }, [dispatch]);

  const handleSend = (content) => {
    if (content.trim()) {
      dispatch(sendMessage({ content, senderId: userId }));
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
      </div>
      <MessageInput message={message} setMessage={setMessage} handleSend={handleSend} />
    </div>
  );
};

export default Chat;