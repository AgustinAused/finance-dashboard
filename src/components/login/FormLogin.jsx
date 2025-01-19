'use client';

import { useState } from 'react';
import AuthApi from '@/api/AuthApi';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importar íconos de Font Awesome

export default function FormLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      const response = await AuthApi.login(formData.email, formData.password);
      setSuccess(true);
      setLoading(false);
      console.log('Login successful:', response);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <div className="relative">
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
        />
         <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-3 text-gray-500 dark:text-gray-400 flex items-center"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
      <button
        type="submit"
        className={`w-full p-2 rounded-md text-white ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {success && <div className="text-sm text-green-500">Login successful!</div>}
    </form>
  );
}
