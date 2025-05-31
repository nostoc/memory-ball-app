"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Icon from "../../public/icon.png";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AuthState } from "@/components/shared/authInitializer";
import toast from "react-hot-toast";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Use state to ensure component re-renders when auth state changes
  const [isLoggedIn, setIsLoggedIn] = useState(AuthState.isAuthenticated);
  const [userEmail, setUserEmail] = useState(AuthState.user?.email || "");

  // Updated navigation links with About page
  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog"},
    { name: "Guide", href: "/guide" },
    { name: "About", href: "/about", hideWhenLoggedIn: true },
    { name: "Community", href: "/community"},
    { name: "Public Decks", href: "/community/public-decks", hideWhenLoggedIn: true },
    { name: "My Decks", href: "/decks/my-decks", authRequired: true },
    { name: "Decks", href: "/decks", authRequired: true },
    { name: "Create Deck", href: "/decks/new", authRequired: true },
    { name: "Study Sessions", href: "/sessions", authRequired: true },
    { name: "Statistics", href: "/stats", authRequired: true },
  ];

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

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
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
    setIsMobileMenuOpen(false);
    toast.success("Successfully logged out!");
    router.push("/auth/login");
  };

  const handleNavigate = (href: string, authRequired: boolean = false) => {
    if (authRequired && !isLoggedIn) {
      router.push("/auth/login");
      return;
    }
    router.push(href);
    setIsMobileMenuOpen(false);
  };

  const isActiveLink = (href: string) => {
    // Special case for specific navigation links to avoid conflicts
    if (href === "/decks" && pathname === "/decks/new") {
      return false; // Don't highlight Decks when on Create Deck
    }

    // For exact match
    if (pathname === href) {
      return true;
    }

    // For the home route
    if (href === "/" && pathname !== "/") {
      return false;
    }

    // For other nested routes
    if (pathname.startsWith(href + "/")) {
      // Only consider a parent active if we want that behavior
      // In this case, we don't want parents active for these specific routes
      return false;
    }

    return false;
  };

  // Update mobile menu toggle to properly close
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-background shadow-md w-full py-2">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-wrap justify-between items-center">
        {/* Logo and App Name */}
        <div className="flex items-center py-4 text-white">
          <Link href="/" className="flex items-center">
            <Image src={Icon} alt="memory ball logo" width={40} height={40} />
            <p className="font-bricolage font-bold text-[20px] ml-2">
              Memory Ball
            </p>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          ref={toggleButtonRef}
          className="md:hidden p-2 rounded-md text-white hover:bg-oceanBlue/20 transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <nav className="flex items-center space-x-4 mr-4">
            {navigationLinks.map((link) =>
              (!link.authRequired && (!link.hideWhenLoggedIn || !isLoggedIn)) ||
              (link.authRequired && isLoggedIn) ? (
                <button
                  key={link.name}
                  onClick={() => handleNavigate(link.href, link.authRequired)}
                  className={`font-montserrat font-bold px-4 py-2 rounded-md transition-colors ${
                    isActiveLink(link.href)
                      ? "text-white hover:bg-oceanBlue/90 hover:text-white"
                      : "text-white hover:bg-oceanBlue/90 hover:text-white"
                  }`}
                >
                  {link.name}
                </button>
              ) : null
            )}
          </nav>

          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="w-10 h-10 rounded-full bg-oceanBlue text-white flex items-center justify-center shadow-md hover:bg-oceanBlue/90 transition-colors"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {userEmail.charAt(0).toUpperCase()}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b font-montserrat">
                    {userEmail}
                  </div>
                  <Link
                    href="/auth/profile"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-montserrat"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-montserrat"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/login">
              <button className="font-montserrat font-bold px-4 py-2 rounded-md bg-oceanBlue text-white hover:bg-oceanBlue/90 transition-colors shadow-md">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden w-full mt-2 bg-white rounded-md shadow-lg z-20"
          >
            <nav className="flex flex-col">
              {navigationLinks.map((link) =>
                (!link.authRequired && (!link.hideWhenLoggedIn || !isLoggedIn)) ||
                (link.authRequired && isLoggedIn) ? (
                  <button
                    key={link.name}
                    onClick={() => handleNavigate(link.href, link.authRequired)}
                    className={`text-left font-montserrat text-sm px-4 py-3 ${
                      isActiveLink(link.href)
                        ? "text-oceanBlue bg-gray-50 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {link.name}
                  </button>
                ) : null
              )}

              {isLoggedIn ? (
                <>
                  <Link
                    href="/profile"
                    className="text-left font-montserrat text-sm px-4 py-3 text-gray-700 hover:bg-gray-50"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-left font-montserrat text-sm px-4 py-3 text-gray-700 hover:bg-gray-50 border-t"
                  >
                    Logout ({userEmail})
                  </button>
                </>
              ) : (
                <Link href="/auth/login" className="block w-full">
                  <button className="w-full text-left font-montserrat text-sm px-4 py-3 text-oceanBlue hover:bg-gray-50 font-semibold">
                    Login
                  </button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
