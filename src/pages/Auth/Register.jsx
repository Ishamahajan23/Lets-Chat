import React, { useState } from 'react';
import { register } from '../../utils/auth';
import Loader from '../../components/Shared/Loader';
import { useNavigate } from 'react-router-dom';

function Register({ darkMode, toggleDarkMode }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    const mobile = event.target.mobile.value;

    setLoading(true);

    try {
      await register(email, password, name, mobile); 
      setSuccess('Registration successful! You can now log in.');

      setError('');
      navigate("/login")
    } catch (err) {

      console.error('Registration error:', err);
      setError("Registration failed. Please check your email and password.");
      setSuccess('');
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
      <button onClick={toggleDarkMode} className="absolute top-4 right-4 p-2 bg-gray-300 dark:bg-gray-700 rounded">
        {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
      </button>
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <form className="w-96 bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
     

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2 text-left text-black">Name</label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-sm font-medium mb-2 text-left text-black">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your mobile number"
            required
          />
        </div>
  
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
          Sign Up
        </button>
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        {success && <p className="mt-4 text-sm text-green-500">{success}</p>}
    
        <p className="mt-4 text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
