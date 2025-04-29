import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer({ onAboutClick }) {
  return (
    <footer className="w-full bg-gray-100 text-gray-600 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        
        {/* Copyright */}
        <div className="text-sm">
          © {new Date().getFullYear()} Halal Matchmaking. All rights reserved.
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4 text-sm">
          <button
            onClick={onAboutClick}
            className="hover:text-primary transition-colors"
          >
            About
          </button>
          <a href="/contact" className="hover:text-primary transition-colors">
            Contact
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 text-xl">
          <a href="https://www.facebook.com/halal_matchmaking_ng/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaTwitter />
          </a>
          <a href="https://www.instagram.com/halal_matchmaking_ng/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
}
