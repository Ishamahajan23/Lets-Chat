import React from 'react';

const Settings = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className={`h-screen p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <button onClick={toggleDarkMode} className="absolute top-4 right-4 p-2 bg-gray-300 dark:bg-gray-700 rounded">
        {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
      </button>
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Theme Preference</label>
        <select className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 dark:text-white">
          <option value="system">System Default</option>
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
        </select>
      </div>
      <div className="text-gray-500 dark:text-gray-400">More account settings coming soon...</div>
    </div>
  );
};

export default Settings;
