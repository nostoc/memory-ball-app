"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaEnvelope, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import Icon from "../../public/icon.png";
import { AuthState } from "@/components/shared/authInitializer";

interface FooterProps {
  appName?: string;
}

const Footer: React.FC<FooterProps> = ({ appName = "Memory Ball" }) => {
  const currentYear = new Date().getFullYear();
  const [, setIsLoggedIn] = useState(AuthState.isAuthenticated);

  // Check auth state on component render and when it changes
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(AuthState.isAuthenticated);
    };

    // Set up an interval to check auth state
    checkAuth();
    const interval = setInterval(checkAuth, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <footer className="footer py-10 bg-neutral text-neutral-content mt-auto font-bricolage">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* App Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <Image src={Icon} alt="memory ball logo" width={40} height={40} />
              <span className="text-xl font-bold">{appName}</span>
            </div>
            <p className="text-sm opacity-75 mb-4">
              Create, study, and master your flashcards with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h2 className="footer-title">Quick Links</h2>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="link link-hover">
                Home
              </Link>
              <Link href="/about" className="link link-hover">
                About
              </Link>
              
              <Link href="contact-us" className="link link-hover">
              Contact Us</Link>
              
            </nav>
          </div>

          {/* Resources */}
          <div className="md:col-span-1">
            <h2 className="footer-title">Resources</h2>
            <nav className="flex flex-col gap-2">
              <Link href="/guide" className="link link-hover">
                Help Center
              </Link>
              <Link className="link link-hover" href="/blog">
                Blog
              </Link>

              <Link href="/#" className="link link-hover">
                Study Tips
              </Link>
              <Link href="/privacy" className="link link-hover">
                Privacy Policy
              </Link>
              <Link href="/terms" className="link link-hover">
                Terms of Use
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div className="md:col-span-1">
            <h2 className="footer-title text-center">Follow Us</h2>
            <div className="flex flex-col justify-center items-center">
              <div className="flex gap-4 mb-4">
                <Link
                  href="https://facebook.com/#"
                  target="_blank"
                  aria-label="Facebook"
                  className="btn btn-circle btn-ghost"
                >
                  <FaFacebook className="text-xl" />
                </Link>
                <Link
                  href="https://twitter.com/#"
                  target="_blank"
                  aria-label="Twitter"
                  className="btn btn-circle btn-ghost"
                >
                  <FaTwitter className="text-xl" />
                </Link>
                <Link
                  href="https://linkedin.com/company/#"
                  target="_blank"
                  aria-label="LinkedIn"
                  className="btn btn-circle btn-ghost"
                >
                  <FaLinkedin className="text-xl" />
                </Link>
              </div>
              <div>
                <Link
                  href="mailto:contact@memoryball.online"
                  className="flex items-center gap-2 text-sm opacity-75 hover:opacity-100 transition-opacity"
                >
                  <FaEnvelope className="text-lg" />
                  contact@memoryball.online
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Centered Copyright with border */}
        <div className="w-full border-t border-gray-700 mt-8 pt-6">
          <p className="text-sm opacity-75 text-center">
            © {currentYear} {appName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
