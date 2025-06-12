// src/components/Shared/ToggleTheme.jsx
import React from 'react';

const ToggleTheme = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="text-sm bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white px-3 py-1 rounded"
    >
      {theme === 'dark' ? '☀ Light' : '🌙 Dark'}
    </button>
  );
};

export default ToggleTheme;
