// src/pages/Settings.jsx
import React from 'react';

const Settings = ({darkMode}) => {
  return (
    <div className={`flex  flex-col justify-center items-center md:ml-80 h-screen w-full md:w-4/5 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <div className="text-gray-500 dark:text-gray-400">More account settings coming soon...</div>
    </div>
  );
};

export default Settings;
