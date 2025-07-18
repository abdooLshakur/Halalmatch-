import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./Navbar";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  const api = "https://api.halalmatchmakings.com";
  const navigate = useNavigate();

  const getUserFromCookies = () => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="));
    return cookie ? JSON.parse(decodeURIComponent(cookie.split("=")[1])) : null;
  };

  const handlePayment = async () => {
    const user = getUserFromCookies();

    if (!user?.email) {
      toast.error("Please log in to proceed.");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${api}/paystack/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: user.email,
          amount: 5000, // Naira
        }),
      });

      const data = await res.json();

      if (res.ok && data.authorization_url) {
        // Redirect to Paystack's secure payment page
        window.location.href = data.authorization_url;
      } else {
        toast.error(data.message || "Failed to initiate payment.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="w-[99vw] max-w-full py-6 bg-white min-h-screen overflow-x-hidden">
      <Navbar />
      <ToastContainer />

      <div className="w-full flex items-center justify-center px-4 py-10">
        <div className="max-w-md w-full bg-white border rounded-lg shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Activate Your Profile
          </h2>

          <p className="text-gray-600 text-sm">
            🔓 Unlock Full Access! Activate your profile with a one-time,
            non-refundable payment of just ₦5,000 — a 50% discount off the
            regular price of <strike>₦10,000</strike>. Gain full features and
            start connecting today!
          </p>

          <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
            <li>Lifetime access – no recurring charges</li>
            <li>Connect freely with verified users</li>
            <li>Support a platform built for halal matchmaking</li>
          </ul>

          <div className="text-sm text-red-600">
            <strong>Note:</strong> This payment is <u>non-refundable</u>.
          </div>

          <div className="pt-4">
            <button
              onClick={handlePayment}
              className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
            >
              Pay ₦5,000 Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
