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
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        {isLoggedIn ? (
          <Link href="/dashboard">
            <p className="">Logo</p>
          </Link>
        ) : (
          <Link href="/">
            <p className="">logo</p>
          </Link>
        )}
      </div>

      <div className="flex items-center">
        {isLoggedIn ? (
          <>
            <Link href="/dashboard" className="hover:text-primary mr-4">
              Dashboard
            </Link>
            <Link
              href="/profile"
              className="hover:text-primary mr-4"
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
          <div>
            <MaterialUISwitchComponent
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
            />
          </div>
        )}
      </div>
    </nav>
  );
}
