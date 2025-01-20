'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import verifyToken from "@/api/CookieApi";
import { logout } from "@/api/AuthApi";



export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const CookieApi = async () => {
      const response = await verifyToken();
      const data = response;
      setIsLoggedIn(data.isLoggedIn);
    };
    CookieApi();
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-xl font-bold text-white">
        <a href="/dashboard">Logo</a>
      </div>

      {/* Opciones del Navbar, solo si el usuario está logueado */}
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
          <>
          </>
        )}
      </div>
    </nav>
  );
}
