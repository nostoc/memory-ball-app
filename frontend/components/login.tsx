"use client";
import { useState } from "react";
import { login } from "../services/authService";

import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const userData = { email, password };
      const response = await login(userData);

      // Use the global login method
      window.loginUser(response.token, response.user);

      // Redirect to home
      router.push("/");
    } catch (err) {
      console.error(err);
      // Error toast is handled in the auth service
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-6">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="input input-bordered bg-base-200 text-base-content w-full"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="input input-bordered bg-base-200 text-base-content w-full"
      />
      <button 
        onClick={handleLogin}
        className="btn btn-primary w-full"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
