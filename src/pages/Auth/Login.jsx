import React, { useState } from 'react';
import { login } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Shared/Loader';

function Login({ darkMode, toggleDarkMode }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    setLoading(true);
    try {
      const user = await login(email, password); 
      setError('');
      if (user) {
        console.log('Navigating to home after login'); 
        navigate('/chatwindow');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError("Login failed. Please check your email and password.");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} h-screen`}>
      <button onClick={toggleDarkMode} className="absolute top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 rounded text-gray-900 dark:text-white">
        {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
      </button>
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form className="w-96 bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-left text-black">Email</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-2 text-left text-black">Password</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Sign Up</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
