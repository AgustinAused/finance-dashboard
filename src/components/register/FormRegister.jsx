'use client';

import { useState } from 'react';

export default function FormRegister() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    companyName: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Registering with:', formData);
      alert('Registration successful!');
    } catch (error) {
      console.error('Error registering:', error);
      alert('Registration failed.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Register</h2>
      {['username', 'email', 'first_name', 'last_name', 'companyName', 'password'].map((field) => (
        <div key={field}>
          <label htmlFor={field} className="block text-sm font-medium capitalize">
            {field.replace('_', ' ')}
          </label>
          <input
            id={field}
            name={field}
            type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
            value={formData[field]}
            onChange={handleChange}
            placeholder={`Enter your ${field.replace('_', ' ')}`}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  );
}
