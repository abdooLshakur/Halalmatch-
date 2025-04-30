import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const api = "https://halal-t0ed.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${api}/request-password-reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Check your inbox for the reset link!");
      setTimeout(() => {
        // navigate(`/reset-password?token=${data.token}&email=${email}`);
    }, 1500);
    } else {
      toast.error(data.message || "Error sending reset link");
    }
  };

  return (
    <div className="w-[99vw] max-w-full py-6 bg-white min-h-screen overflow-x-hidden">
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ForgotPassword;
