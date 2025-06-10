import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Sun, Moon, LogOut } from 'lucide-react';

const Home = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark' : ''}`}>
      <aside className="w-16 md:w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold hidden md:block">ChatApp</h1>
          <button
            onClick={toggleDarkMode}
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="flex items-center space-x-3 mb-6">
          <img
            src="/avatar.svg"
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="hidden md:block">
            <p className="font-semibold">Welcome</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">User Name</p>
          </div>
        </div>

        <nav className="space-y-4">
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            Chats
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            Groups
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            Tagged
          </button>
        </nav>

        <div className="mt-auto">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-900">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-4">
        <h2 className="text-2xl font-semibold mb-4">Chats</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">Chat {i + 1}</h3>
                <span className="text-xs text-gray-400">5m ago</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Last message preview goes here...
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
