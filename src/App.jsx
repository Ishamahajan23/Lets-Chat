// src/App.jsx
import React, { useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; 
import store from './redux/store';
import { AppRouter } from './routes/AppRouter';
import Sidebar from './components/Shared/Sidebar';

const AppContent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300 `}>
      {user && (
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      )}
      <div className={user ? 'flex-1' : 'w-full'}>
        <AppRouter darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <BrowserRouter> 
      <AppContent />
    </BrowserRouter>
  </Provider>
);

export default App;
