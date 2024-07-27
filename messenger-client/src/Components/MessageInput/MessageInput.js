import React from 'react';
import './MessageInput.css';

const MessageInput = ({ message, setMessage, handleSend }) => {
  const onSend = () => {
    handleSend(message);
    setMessage('');
  };

  return (
    <div className="message-input-container">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="message-input"
      />
      <button onClick={onSend} className="send-button">Send</button>
    </div>
  );
};

export default MessageInput;