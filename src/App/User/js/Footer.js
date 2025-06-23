import {  FaTwitter, FaInstagram } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import { SiThreads } from 'react-icons/si'; 
export default function Footer({ onAboutClick }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-pink-50 text-slate-700 border-t border-pink-200 mt-20 relative">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">

        {/* Left: Copyright */}
        <div className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} Halal Matchmaking. All rights reserved.
        </div>

        {/* Center: Links with underline on hover */}
        <div className="flex space-x-6 text-sm font-medium">
          <a
            href="/contact"
            className="hover:text-pink-600 relative after:block after:h-0.5 after:bg-pink-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
          >
            Contact
          </a>
        </div>

        {/* Right: Social Icons */}
        <div className="flex space-x-5 text-2xl">
          <a
            href="https://x.com/thehalalalmatch?t=tPJ77qJDNlqVTAHaBfnHEQ&s=09"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-600 transition-transform duration-300 hover:scale-110"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com/halalmatch.comm?igsh=MW9pYmM2ZTloenY5aA%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-600 transition-transform duration-300 hover:scale-110"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.threads.net/@halalmatch.comm"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-600 transition-transform duration-300 hover:scale-110"
          >
            <SiThreads />
          </a>
        </div>

      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute right-6 bottom-6 bg-white border border-pink-300 text-pink-500 p-3 rounded-full shadow hover:bg-pink-100 transition-all duration-300"
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
}
