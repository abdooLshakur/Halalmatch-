import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const api = "https://api.halalmatchmakings.com";

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

    fetch(`${api}/Admin-login`, {
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
            navigate("/matched-users");
          }, 1000);
        } else {
          setError(true);
          toast.error(data.message || "Invalid credentials.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        toast.error("An error occurred during login. Please try again.");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-white to-blue-100 px-4">
      <ToastContainer />
      <div className="w-full max-w-[500px] bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">Admin Login</h2>
        <p className="text-center text-sm text-gray-500 mb-6">Access your dashboard securely</p>
        <form className="space-y-5" onSubmit={handleEvent}>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
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
            <Link to="/forgot-password" className="text-rose-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 text-white font-medium py-3 rounded-lg hover:bg-rose-600 transition"
            disabled={isLoading}
          >
            {isLoading ? <span className="spinner"></span> : "Login"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default AdminLogin;
