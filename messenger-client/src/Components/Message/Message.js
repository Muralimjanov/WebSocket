import React from 'react';
import './Message.css';

const Message = ({ message }) => {
  return (
    <div className={`message ${message.senderId === 'currentUserId' ? 'outgoing' : 'incoming'}`}>
      <div className="message-content">{message.content}</div>
    </div>
  );
};

export default Message;