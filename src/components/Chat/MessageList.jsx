import React from 'react';
import MessageBubble from './MessageBubble';

function MessageList({ messages, currentUser }) {
  return (
    <div>
      {messages.map((msg, index) => (
        <MessageBubble
          key={index}
          message={msg.text}
          isOwn={msg.sender === currentUser}
        />
      ))}
    </div>
  );
}

export default MessageList;
