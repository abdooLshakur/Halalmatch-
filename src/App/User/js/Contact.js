import React from 'react'
import '../css/Contact.css';
import Navbar from './Navbar';

const ContactPage = () => {
    const api = "https://api.halalmacthmakings.com";

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
        <div>
            <div><Navbar /></div>
            <div className="w-[99vw] h-screen flex items-center justify-center bg-gray-100 ">
            <div>
            <div className="contact-us">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mt-4">Contact Us</h1>
            </div>
            <section className="contact-section w-full flex flex-col md:flex-row gap-8 p-4 sm:p-6 md:p-10">
                <div className="contact-info w-full md:w-1/2 text-[15px] text-center md:text-left">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-indigo-700">Get In Touch With Us</h2>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">We’d love to hear from you! Fill out the form below or reach out via email — we’ll get back to you as soon as possible.</p>
                    <div className="social-icons flex justify-center md:justify-start gap-4 text-2xl mb-4">
                        <a href="#" aria-label="facebook"><i className="fab fa-facebook"></i></a>
                        <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                        <a href="https://www.instagram.com/halal_matchmaking_ng/" aria-label="instagram"><i className="fab fa-instagram"></i></a>
                        <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                    </div>
                    <div className="contact-details space-y-2 text-sm sm:text-base">
                        <p><strong>Phone:</strong> 07025555250</p>
                        <p><strong>Email:</strong> Halalmatch.org@gmail.com</p>
                    </div>
                </div>
                <div className="contact-form w-full md:w-1/2">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full sm:w-[97%] mx-auto">
                        <input type="text" name="name" placeholder="Name" required className="border border-gray-300 rounded px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <input type="email" name="email" placeholder="Email" required className="border border-gray-300 rounded px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <textarea name="message" placeholder="Message" rows="5" required className="border border-gray-300 rounded px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                        <button type="submit" className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition text-sm sm:text-base">Contact us</button>
                    </form>
                </div>
            </section>
            </div>
        </div>
        </div>


    )
}

export default ContactPage
