"use client";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/authService";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";

// You can expand this interface based on your user data structure
interface User {
  email: string;
  id: string;
}

// Create a global state object to access auth state across components
export const AuthState = {
  isAuthenticated: false,
  user: null as User | null,
  isLoading: true,
};

interface AuthInitializerProps {
  children: React.ReactNode;
}

// Declare global methods
declare global {
  interface Window {
    loginUser: (token: string, user: User) => void;
    logoutUser: () => void;
  }
}

const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        AuthState.isAuthenticated = false;
        AuthState.user = null;
        AuthState.isLoading = false;
        setIsInitialized(true);
        return;
      }

      try {
        const userData = await getCurrentUser();
        if (userData && userData.user) {
          AuthState.user = userData.user;
          AuthState.isAuthenticated = true;
        } else {
          // If getCurrentUser returns but there's no user, clear token
          localStorage.removeItem("token");
          AuthState.isAuthenticated = false;
          AuthState.user = null;

          // Redirect to login if on a protected route
          if (pathname !== "/auth/login" && pathname !== "/auth/register") {
            router.push("/auth/login");
          }
        }
      } catch (error) {
        console.error("Authentication error:", error);
        localStorage.removeItem("token");
        AuthState.isAuthenticated = false;
        AuthState.user = null;

        // Redirect to login if on a protected route
        if (pathname !== "/auth/login" && pathname !== "/auth/register") {
          router.push("/auth/login");
        }
      } finally {
        AuthState.isLoading = false;
        setIsInitialized(true);
      }
    };

    initializeAuth();

    // Add global methods for login/logout only on the client side
    if (typeof window !== "undefined") {
      window.loginUser = (token: string, user: User) => {
        localStorage.setItem("token", token);
        AuthState.user = user;
        AuthState.isAuthenticated = true;
        toast.success("Successfully logged in!");
      };

      window.logoutUser = () => {
        localStorage.removeItem("token");
        AuthState.user = null;
        AuthState.isAuthenticated = false;
      };
    }
  }, [pathname, router]);

  // Show nothing until auth is initialized
  if (!isInitialized) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
};

export default AuthInitializer;
