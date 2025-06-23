import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const api = "https://api.halalmatchmakings.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return; // prevent multiple requests
    setIsLoading(true);

    try {
      const res = await fetch(`${api}/request-password-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Check your inbox for the reset link!");
      } else {
        toast.error(data.message || "Error sending reset link");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-white to-blue-100 px-4">
      <ToastContainer />
      <div className="w-full max-w-[500px] bg-white shadow-xl rounded-2xl p-8 mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Enter your email and we'll send you a reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white font-medium py-3 rounded-lg transition ${
              isLoading
                ? "bg-rose-300 cursor-not-allowed"
                : "bg-rose-500 hover:bg-rose-600"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Sending...
              </div>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
