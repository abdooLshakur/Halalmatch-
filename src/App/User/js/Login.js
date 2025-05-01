import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const api = "https://halal-t0ed.onrender.com";

  const handleEvent = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (email === "" || password === "") {
      setError(true);
      toast.warning("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    const UserDetails = { email, password };

    fetch(`${api}/user-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(UserDetails),
      credentials: "include", 
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message || "Login successful!");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          setError(true);
          toast.error(data.message || "Invalid credentials.");
        }
      })
      .catch((err) => {
        toast.error("Error:", err);
        setError(true);
        toast.error("An error occurred during login. Please try again.");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div >
      <Navbar />
    <div className="w-[99vw] h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>
        <form className="space-y-4 mt-6" onSubmit={handleEvent}>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && email === "" && (
              <span className="text-red-500 text-sm mt-1 block">
                Please enter an email.
              </span>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && password === "" && (
              <span className="text-red-500 text-sm mt-1 block">
                Please enter a password.
              </span>
            )}
          </div>

          <div className="text-right text-sm">
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            disabled={isLoading}
          >
            {isLoading ? <span className="spinner"></span> : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Signup
          </a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
