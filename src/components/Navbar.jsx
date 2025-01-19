'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import verifyToken from "@/api/CookieApi";
import { logout } from "@/api/AuthApi";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Llamamos a la API para verificar si el usuario está logueado
    const CookieApi = async () => {
      const response = await verifyToken();
      const data = response;
      setIsLoggedIn(data.isLoggedIn);
    };
    CookieApi();
  }, []);

  const handleLogout = async () => {
    // Llamamos a la función logout de authApi
    await logout(); // Asegúrate de que 'logout' esté importado desde el archivo authApi.js
    setIsLoggedIn(false); // Cambiar el estado de login
    router.push("/"); // Redirige al usuario al inicio o login
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-xl font-bold">
        <a href="/dashboard">Logo</a>
      </div>

      {/* Opciones del Navbar, solo si el usuario está logueado */}
      <div className="flex items-center">
        {isLoggedIn ? (
          <>
            <Link href="/dashboard" className="mr-4">
              Dashboard
            </Link>
            <Link href="/profile" className="mr-4">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded text-white"
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
