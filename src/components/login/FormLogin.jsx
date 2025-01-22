'use client';

import {useState } from 'react';
import { login } from '@/api/AuthApi'; // Importar el módulo AuthApi
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importar íconos de Font Awesome
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { TextField } from '@mui/material';


export default function FormLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false)
  const { loginUser } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(formData.email, formData.password);
      loginUser(); // Actualiza el estado global
      setSuccess(true)
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
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
        <TextField
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className='input'
          variant='outlined'
          label="Email"
        />
      </div>
      <div className="relative">
         <TextField
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          variant='outlined'
          label="Password"
          className="input"
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
