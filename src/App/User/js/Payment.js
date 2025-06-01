import React, { useState } from 'react';

export default function PaystackTransfer() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [reference, setReference] = useState(null);
  const [status, setStatus] = useState(null);
  const api = "https://api.halalmatchmakings.com"; // Corrected syntax

  const initiatePayment = async () => {
    if (!email || !amount) return alert('Please enter email and amount');

    const res = await fetch(`${api}/payment/paystack/initiate`, { // Fixed template literal
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, amount: Number(amount) }),
      credentials: 'include', // Fixed typo from `withcreadentials` to `credentials`
    });
    const data = await res.json();

    if (data.status === 'success') {
      setPaymentUrl(data.authorization_url);
      setReference(data.reference);
      setStatus('pending');
      window.location.href = data.authorization_url;
    } else {
      alert('Failed to initiate payment');
    }
  };

  const verifyPayment = async () => {
    if (!reference) return;

    const res = await fetch(`${api}/payment/paystack/verify/${reference}`); // Updated the URL for verification
    const data = await res.json();

    if (data.status === 'success') {
      setStatus('success');
      alert('Payment successful!');
    } else {
      setStatus('failed');
      alert('Payment failed or pending.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow-md mt-10 text-center">
      <h2 className="text-2xl font-bold mb-4">Bank Transfer via Paystack</h2>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="number"
        placeholder="Amount (₦)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={initiatePayment}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Pay via Bank Transfer
      </button>

      {status === 'pending' && (
        <button
          onClick={verifyPayment}
          className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
        >
          Verify Payment
        </button>
      )}

      {status === 'success' && <p className="mt-4 text-green-600 font-semibold">Payment was successful!</p>}
      {status === 'failed' && <p className="mt-4 text-red-600 font-semibold">Payment failed or not completed.</p>}
    </div>
  );
}
