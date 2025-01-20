'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';



export default function Navbar() {
  const { isLoggedIn, logoutUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    logoutUser();
    router.push("/");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-white">
        <Link href="/dashboard">Logo</Link>
      </div>

      <div className="flex items-center">
        {isLoggedIn ? (
          <>
            <Link href="/dashboard" className="text-white hover:text-primary mr-4">
              Dashboard
            </Link>
            <Link href="/profile" className="text-white hover:text-primary mr-4">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-danger text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="text-white hover:text-primary mr-4">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
