"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Icon from "../../public/icon.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthState } from "@/components/shared/authInitializer";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Use state to ensure component re-renders when auth state changes
  const [isLoggedIn, setIsLoggedIn] = useState(AuthState.isAuthenticated);
  const [userEmail, setUserEmail] = useState(AuthState.user?.email || "");

  // Check auth state on component render and when it changes
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(AuthState.isAuthenticated);
      setUserEmail(AuthState.user?.email || "");
    };

    // Set up an interval to check auth state
    checkAuth();
    const interval = setInterval(checkAuth, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Handle clicks outside of dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    window.logoutUser();
    setIsDropdownOpen(false);
    router.push("/auth/login");
  };

  return (
    <header className="bg-background flex justify-between items-center shadow-md w-full py-2">
      <div className="container mx-auto flex-1 flex justify-between items-center ">
        <div className="flex items-center flex-1 py-4 text-white">
          <Image src={Icon} alt="memory ball logo" width={40} height={40} />
          <p className="font-bricolage font-bold text-[20px] borde">
            Memory Ball
          </p>
        </div>
        <div>
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="w-10 h-10 rounded-full bg-oceanBlue text-white flex items-center justify-center"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {userEmail.charAt(0).toUpperCase()}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    {userEmail}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/login">
              <button className="bg-oceanBlue text-white font-bold px-4 py-2 rounded-md">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
