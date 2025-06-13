// src/components/Shared/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Moon, Sun, MessageCircle, Users, Settings, LogOut , Search, Bell} from 'lucide-react';
import { logout as logoutAction } from '../../features/auth/authSlice';

import { logout as firebaseLogout } from '../../utils/auth';

import Notification from './Notification';

const Sidebar = ({ darkMode, toggleDarkMode }) => {

  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await firebaseLogout(); 
      dispatch(logoutAction());
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };



  return (
    <div className={`flex flex-col h-screen w-85 p-4 fixed ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-lg transition-colors duration-300 border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="mb-6 text-2xl font-bold tracking-wide">Let's Chat</div>

      <nav className="flex  flex-col space-y-4">
       
        <Link to="/chatlayout" className="flex items-center gap-2 hover:text-blue-500">
          <MessageCircle size={20} /> Messages
        </Link>

        <Link to="/groups" className="flex items-center gap-2 hover:text-blue-500">
          <Users size={20} /> Groups
        </Link>

        <Link to="/settings" className="flex items-center gap-2 hover:text-blue-500">
          <Settings size={20} /> Settings
        </Link>

        
         
     
      </nav>
      <div className="">
          <Notification darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>

      <div className="mt-auto space-y-4">
        <button onClick={toggleDarkMode} className="flex items-center gap-2 cursor-pointer">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />} Theme
        </button>

        <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 cursor-pointer">
          <LogOut size={20} /> Logout
        </button>

        <div className="text-xs text-gray-400">Logged in as: {user?.email}</div>
      </div>
    </div>
  );
};

export default Sidebar;