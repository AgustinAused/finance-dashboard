'use client';
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import Link from "next/link";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const router = useRouter(); 

  // Simulación de login, cambia este estado según el proceso de login real
  const handleLogin = () => {
    setIsLoggedIn(true); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false); 
    router.push("/"); 
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
    // No hacer nada si el usuario no está logueado, el bloque está vacío
    null
  )}
</div>
    </nav>
  );
}
