import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import softRoseBg from "../images/bg2.png"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const api = "https://api.halalmatchmakings.com";
  const handleEvent = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      setError(true);
      toast.warning("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    fetch(`${api}/user-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message || "Login successful!");
          setTimeout(() => navigate("/"), 1000);
        } else {
          toast.error(data.message || "Invalid credentials.");
          setError(true);
        }
      })
      .catch(() => {
        toast.error("An error occurred during login.");
        setError(true);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      className="min-h-screen w-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${softRoseBg})` }}
    >
      <Navbar />
      <ToastContainer />

      {/* Full-screen center */}
      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white/30 backdrop-blur-xl p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
          <form className="space-y-4" onSubmit={handleEvent}>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg border border-white/40 bg-white/60 focus:outline-none focus:ring-2 focus:ring-rose-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && email === "" && <p className="text-red-500 text-sm">Please enter an email.</p>}

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg border border-white/40 bg-white/60 focus:outline-none focus:ring-2 focus:ring-rose-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && password === "" && <p className="text-red-500 text-sm">Please enter a password.</p>}

            <div className="text-right text-sm">
              <Link to="/forgot-password" className="text-rose-500 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-rose-400 hover:bg-rose-500 text-white font-medium py-3 rounded-lg transition"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-4 text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-rose-500 hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
