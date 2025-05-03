import React from 'react'
import '../css/Contact.css';
import Navbar from './Navbar';

const ContactPage = () => {
    const api = "https://halal-m2e0.onrender.com";

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
            <div class="contact-us">
                <h1>Contact Us</h1>
            </div>
            <section class="contact-section">
                <div class="contact-info">
                    <h2>Get In touch with us</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus vestib ulum mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus vestibulum mauris quis aliquam. Integer accumsan sodales odio, id tempus velit ullamc.</p>
                    <div class="social-icons">
                        <a href="#" aria-label="Pinterest"><i class="fab fa-pinterest"></i></a>
                        <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                        <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="#" aria-label="Behance"><i class="fab fa-behance"></i></a>
                        <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                    </div>
                    <div class="contact-details">
                        <p><strong>Phone:</strong> +45 677 899300 223</p>
                        <p><strong>Email:</strong> office@template.com</p>
                        <p><strong>Address:</strong> Main Str. no 45-46, b3, 56832, Los Angeles, CA</p>
                    </div>
                </div>
                <div class="contact-form">
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Name" required />
                        <input type="email" name="email" placeholder="Email" required />
                        <textarea name="message" placeholder="Message" rows="5" required></textarea>
                        <button type="submit">Contact us</button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default ContactPage
