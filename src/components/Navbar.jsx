"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { logout } from "@/api/AuthApi";
import MaterialUISwitchComponent from "@/components/navbar/MaterialUISwitch";

export default function Navbar() {
  const { isLoggedIn, logoutUser } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    logoutUser();
    router.push("/");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-white">
        {isLoggedIn ? (
          <Link href="/dashboard">
            <span>logo</span>
          </Link>
        ) : (
          <Link href="/">
            <span>logo</span>
          </Link>
        )}
      </div>

      <div className="flex items-center">
        {isLoggedIn ? (
          <>
            <Link
              href="/dashboard"
              className="text-white hover:text-primary mr-4"
            >
              Dashboard
            </Link>
            <Link
              href="/profile"
              className="text-white hover:text-primary mr-4"
            >
              Profile
            </Link>
            <MaterialUISwitchComponent
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
            />
            <button
              onClick={handleLogout}
              className="bg-danger text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </nav>
  );
}
