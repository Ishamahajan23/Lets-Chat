import React from 'react';

const MessageBubble = ({ message, isMe }) => {
  return (
    <div
      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isMe
          ? 'bg-green-300 text-black self-end'
          : 'bg-gray-200 text-black self-start'
      }`}
    >
      <p>{message.text}</p>
      <p className="text-xl text-black">{message.timestamp}</p>
    </div>
  );
};

export default MessageBubble;

