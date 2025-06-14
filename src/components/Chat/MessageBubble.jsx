import React from 'react';

const MessageBubble = ({ message, isMe }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={`max-w-full md:max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isMe
          ? 'bg-green-300 text-black self-end'
          : 'bg-gray-200 text-black self-start'
      }`}
    >
      <p className="truncate">{message.text}</p>
      <p className="text-xs mt-1 text-gray-500">{formatTime(message.timestamp)}</p>
      <p className="text-xs text-gray-400 truncate">{message.senderName}</p>
    </div>
  );
};

export default MessageBubble;

