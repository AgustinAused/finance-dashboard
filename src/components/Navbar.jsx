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
    <div className="bg-gray-800 p-4 flex justify-between items-center">
    {/* <div className=""> */}
    <div className="navbar-title">
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
      <div>
      {isLoggedIn ? (
        <div>
          <Link href="/dashboard" className="navbar-text">
            Dashboard
          </Link>
          <Link
            href="/profile"
            className="navbar-text"
          >
            Profile
          </Link>
          <Link
            href="/transactions"
            className="navbar-text"
          >
            Transactions
          </Link>
        </div> 

        ) : (
          <div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        {isLoggedIn ? (
            <div>
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
            </div>
        ) : (
          <div>
            <MaterialUISwitchComponent
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
            />
          </div>
        )}
      </div>
      </div>
  )}
  

