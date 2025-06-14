import React from 'react';

const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chat Room</h2>
      <button className="text-sm text-blue-600 hover:underline">Leave</button>
    </div>
  );
};

export default ChatHeader;
