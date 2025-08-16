// LoginForm.jsx
import { useState } from "react";
import { useAuth } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";
import { Mail, LockKeyhole } from "lucide-react";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    // The main container with a dark background and a radial gradient
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-6 font-sans antialiased relative overflow-hidden">
      {/* Background radial gradient for a stylish effect */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute w-96 h-96 rounded-full bg-purple-500 blur-3xl -top-20 -left-20 animate-pulse-slow"></div>
        <div className="absolute w-96 h-96 rounded-full bg-pink-500 blur-3xl -bottom-20 -right-20 animate-pulse-slow delay-1000"></div>
      </div>

      {/* Login card container with a frosted glass effect */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20">
        <h2 className="text-4xl font-extrabold mb-4 text-center text-white drop-shadow-lg">
          Welcome Back
        </h2>
        <p className="text-white/80 text-center mb-8">
          Please log in to your account
        </p>

        {/* Display error message if it exists */}
        {error && (
          <p className="text-red-400 text-center mb-4 font-medium bg-red-800/20 p-3 rounded-lg border border-red-400">
            {error}
          </p>
        )}

        {/* Form section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username input with icon */}
          <div>
            <label className="block mb-2 font-semibold text-white/90 text-sm">
              Username
            </label>
            <div className="relative">
              <input
                name="username"
                type="text"
                placeholder="Enter your username"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white/20 text-white placeholder-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-300"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" size={20} />
            </div>
          </div>

          {/* Password input with icon */}
          <div>
            <label className="block mb-2 font-semibold text-white/90 text-sm">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white/20 text-white placeholder-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-300"
              />
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" size={20} />
            </div>
          </div>

          {/* Login button with loading state */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl font-bold text-lg transition-all duration-300
              ${isSubmitting
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg"
              }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register link */}
        <p className="mt-6 text-center text-white/80">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-pink-400 hover:underline cursor-pointer font-semibold transition-colors duration-300"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
