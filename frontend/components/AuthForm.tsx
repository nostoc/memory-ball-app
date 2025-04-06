import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginCredentials, RegisterCredentials } from "../types/authTypes";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (data: LoginCredentials | RegisterCredentials) => Promise<void>;
  error: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, error }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<
    LoginCredentials | RegisterCredentials
  >({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    router.push("/auth/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 md:py-12">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-2xl font-poppins p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 md:mb-8 text-center text-gray-900">
          {type === "login" ? "Welcome Back!" : "Create an Account"}
        </h2>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 md:p-4 rounded-lg mb-4 md:mb-6 text-sm md:text-base">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {type === "register" && (
            <div className="space-y-1.5 md:space-y-2">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={(formData as RegisterCredentials).name}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue transition duration-200 outline-none"
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          <div className="space-y-1.5 md:space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue transition duration-200 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-1.5 md:space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue transition duration-200 outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-oceanBlue text-white font-semibold py-2.5 md:py-3 px-4 rounded-lg text-sm md:text-base hover:bg-background focus:outline-none focus:ring-2 focus:ring-bg-oceanBlue focus:ring-offset-2 transition-all duration-200 mt-6"
          >
            {type === "login" ? "Sign in" : "Sign Up"}
          </button>

          <div className="text-center text-xs md:text-sm text-gray-600 mt-4">
            {type === "login" ? (
              <p>
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/register"
                  className="text-oceanBlue hover:text-background font-semibold underline"
                >
                  Register
                </Link>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-oceanBlue hover:text-background font-semibold underline"
                >
                  Login
                </Link>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
