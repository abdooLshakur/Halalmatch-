import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const api = "https://api.halalmatchmakings.com";

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${api}/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, token, newPassword }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Password has been reset!");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      toast.error(data.message || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-white to-blue-100 px-4">
      <ToastContainer />
      <div className="w-full max-w-[500px] bg-white shadow-xl rounded-2xl p-8 mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Reset Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Enter a new password to continue.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="password"
            placeholder="New password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 rounded-lg transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
