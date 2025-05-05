import React from 'react'
import '../css/Contact.css';
import Navbar from './Navbar';

const ContactPage = () => {
    const api = "https://api.zmhcollections.online";

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
          alert(result.message);
          form.reset();
        } catch (error) {
          console.error("Error:", error);
          alert("Failed to send message. Try again later.");
        }
      };      
    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
        <Navbar />
      
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700">Contact Us</h1>
        </div>
      
        <section className="flex flex-col lg:flex-row gap-10 justify-center items-start w-full max-w-7xl mx-auto">
          {/* Contact Info */}
          <div className="w-full lg:w-1/2 px-2 sm:px-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Get In Touch with Us</h2>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus vestibulum mauris quis aliquam.
              Integer accumsan sodales odio, id tempus velit ullamcorper id.
            </p>
      
            {/* Social Icons */}
            <div className="flex gap-4 text-indigo-600 text-xl mb-4">
              <a href="#" aria-label="Pinterest"><i className="fab fa-pinterest"></i></a>
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="Behance"><i className="fab fa-behance"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
            </div>
      
            {/* Contact Details */}
            <div className="text-sm sm:text-base text-gray-700 space-y-2">
              <p><strong>Phone:</strong> +45 677 899300 223</p>
              <p><strong>Email:</strong> office@template.com</p>
              <p><strong>Address:</strong> Main Str. no 45-46, b3, 56832, Los Angeles, CA</p>
            </div>
          </div>
      
          {/* Contact Form */}
          <div className="w-full lg:w-1/2 px-2 sm:px-4">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full" style={{ width: '97%' }}>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Message"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm sm:text-base font-semibold hover:bg-indigo-700 transition"
                >
                  Contact Us
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>      
    )
}

export default ContactPage
