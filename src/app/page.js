'use client';

import FormLogin from '@/components/login/FormLogin';
import FormRegister from '@/components/register/FormRegister';
import { useState } from 'react';

export default function Home() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" >
      <div className="w-full max-w-xl rounded-lg p-6 flex flex-col">
        <div className="flex items-center justify-center pt-6 flex-grow">
          {showLogin ? <FormLogin /> : <FormRegister />}
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={toggleForm}
            className="text-blue-600 hover:text-blue-800 pb-2"
          >
            {showLogin
              ? "Don't have an account? Register here"
              : 'Already have an account? Login here'}
          </button>
        </div>
      </div>
    </div>
  );
}
