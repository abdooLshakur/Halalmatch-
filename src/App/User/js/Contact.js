import React, { useState } from 'react';
import '../css/Contact.css';
import Navbar from './Navbar';

const ContactPage = () => {
  const api = "https://api.halalmacthmakings.com";
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const res = await fetch(`${api}/contactus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      form.reset();
      showToastMessage(result.message || 'Message sent successfully!');
    } catch (error) {
      console.error("Error:", error);
      showToastMessage("Failed to send message. Try again later.");
    }
  };

  const showToastMessage = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="w-screen max-w-none min-h-screen overflow-x-hidden bg-gray-100 relative">
      <Navbar />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-slide-up">
          {toastMsg}
        </div>
      )}

      <div className="flex items-center justify-center w-full h-full py-10 px-4 sm:px-6 lg:px-12">
        <div className="w-full max-w-screen-xl bg-white shadow-md rounded-md p-6 sm:p-10 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">Contact Us</h1>
          <div className="flex flex-col md:flex-row gap-8">

            {/* Contact Info Section */}
            <div className="w-full md:w-1/2 space-y-5 text-center md:text-left text-sm sm:text-base">
              <h2 className="text-xl sm:text-2xl font-semibold text-indigo-700">Get In Touch With Us</h2>
              <p className="text-gray-600">
                We’d love to hear from you! Fill out the form or reach out — we’ll get back as soon as possible.
              </p>

              {/* Social Icons */}
              <div className="flex justify-center md:justify-start gap-4 text-2xl text-gray-700">
                <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
                <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="https://www.instagram.com/halal_matchmaking_ng/" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
              </div>

              <div className="space-y-1 text-gray-700">
                <p><strong>Phone:</strong> 07025555250</p>
                <p><strong>Email:</strong> Halalmatch.org@gmail.com</p>
              </div>

              {/* WhatsApp Chat Link */}
              <div className="mt-4">
                <a
                  href="https://wa.me/2347025555250"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow transition duration-300"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="w-full md:w-1/2">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className="border border-gray-300 rounded px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="border border-gray-300 rounded px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  rows="5"
                  required
                  className="border border-gray-300 rounded px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition text-sm sm:text-base"
                >
                  Contact us
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
