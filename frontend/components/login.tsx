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
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
