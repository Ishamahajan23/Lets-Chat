import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Moon, Sun, MessageCircle, Users, Settings, LogOut, Menu, X } from 'lucide-react';
import { logout as logoutAction } from '../../features/auth/authSlice';
import { logout as firebaseLogout } from '../../utils/auth';
import Notification from './Notification';

const Sidebar = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
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

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 p-2 rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'} md:hidden`}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-75 p-4 z-40 transform  flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ${
          darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        } shadow-lg border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
      >
        <div className="mb-6 text-2xl font-bold tracking-wide text-right md:text-left">Let's Chat</div>

        <nav className="flex flex-col space-y-4">
          <Link to="/chatlayout" className="flex items-center gap-2 hover:text-blue-500">
            <MessageCircle size={20} /> Messages
          </Link>

          <Link to="/groups" className="flex items-center gap-2 hover:text-blue-500">
            <Users darkMode={darkMode} size={20} /> Groups
          </Link>

          <Link to="/settings" className="flex items-center gap-2 hover:text-blue-500">
            <Settings size={20} darkMode={darkMode} /> Settings
          </Link>
        </nav>

        <div className="mt-6">
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

      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;