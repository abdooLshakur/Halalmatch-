import React from 'react';
import { PaystackButton } from 'react-paystack';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './Navbar';

const Payment = () => {
  const api = "https://api.halalmatchmakings.com";
  const navigate = useNavigate();

  const publicKey = 'pk_live_e9c95e99506fa63a32392517a482d79a8640e078';
  const amount = 5000 * 100; // Paystack uses kobo

  const getUserFromCookies = () => {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('user='));
    return cookie ? JSON.parse(decodeURIComponent(cookie.split('=')[1])) : null;
  };
  useEffect(() => {
    const checkVerification = async () => {
      try {

        const res = await fetch(`${api}/checkactivation`, {
          method: 'GET',
          credentials: 'include',
        });

        if (res.status === 401) {
          toast.error("Your session has expired. Please log in again.");
          navigate("/login");
          return;
        }

        const data = await res.json();

        if (res.ok && data?.isVerified === true) {
          navigate('/profile');
        }
        // else: user stays on page, likely for activation/payment
      } catch {
        toast.error("Unable to verify your activation status. Please try again later.");
      }
    };

    checkVerification();
  }, []);

  const email = getUserFromCookies()?.email;

  const onSuccess = async (reference) => {
    const user = getUserFromCookies();
    const email = user?.email;
    const ref = reference?.reference;

    if (!email || !ref) {
      toast.error('Something went wrong. Please contact support.');
      return;
    }

    try {
      const res = await fetch(`${api}/activate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, reference: ref }),
      });

      const data = await res.json();

      if (res.ok && data?.success === true) {
        const updatedUser = { ...user, isVerified: true };
        document.cookie = `user=${encodeURIComponent(JSON.stringify(updatedUser))}; path=/;`;

        toast.success('Your account has been successfully activated!');
        navigate('/profile');
      } else {
        toast.error(data?.message || 'Payment verification failed. Please contact support.');
      }

    } catch {
      toast.error('Unable to verify your payment at the moment. Please try again later.');
    }
  };



  const onClose = () => {
    toast('Payment Canceled.');
  };

  const componentProps = {
    email,
    amount,
    publicKey,
    text: 'Pay ₦5000 Now',
    onSuccess,
    onClose,
  };

  return (
    <div className="w-[99vw] max-w-full py-6 bg-white min-h-screen overflow-x-hidden">
      <Navbar />
      <ToastContainer />

      <div className="w-full flex items-center justify-center px-4 py-10">
        <div className="max-w-md w-full bg-white border rounded-lg shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">Activate Your Profile</h2>

          <p className="text-gray-600 text-sm">
            🔓 Unlock Full Access!
            Activate your profile with a one-time, non-refundable payment of just ₦5,000 — a massive 50% discount off the regular price of <strike>₦10,000</strike>.
            Gain full features and start connecting with matches today!</p>

          <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
            <li>Lifetime access – no recurring charges</li>
            <li>Connect freely with other verified users</li>
            <li>Support a platform built for halal matchmaking</li>
          </ul>

          <div className="mt-6 text-sm text-red-600">
            <strong>Note:</strong> This payment is <u>non-refundable</u>.
          </div>

          <div className="pt-4">
            <PaystackButton
              {...componentProps}
              className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
            />
          </div>
        </div>
      </div>
    </div>
  );


};

export default Payment;
