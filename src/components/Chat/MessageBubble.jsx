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
      <p className="text-xs text-gray-500">
        {new Date(message.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
      <p className="text-xs text-gray-400">{message.senderName}</p> {/* Display sender's name */}
    </div>
  );
};

export default MessageBubble;

