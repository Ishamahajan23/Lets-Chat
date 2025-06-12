import React from 'react';
import { MessageCircle } from 'lucide-react';

export const ChatWindow = ({ darkMode }) => {
  return (
    <div className={`flex items-center justify-center h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>

      <div className="text-center">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle size={40} className="text-blue-500" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Welcome to Let's Chat</h3>
        <p>Select a chat to start messaging with your friends</p>
      </div>
    </div>
  );
};
