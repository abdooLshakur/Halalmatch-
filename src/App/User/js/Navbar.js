import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "../js/Button";
import { BellIcon } from "@heroicons/react/24/outline";
import logo from "../images/logo.png";
import userimg from "../images/user.png";
import { toast } from "react-toastify";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [newMessages, setNewMessages] = useState(0);
  const api = "https://api.halalmatchmakings.com";
  const navigate = useNavigate();

  useEffect(() => {
    const userCookie = Cookies.get("user");

    if (userCookie) {
      setIsLoggedIn(true);
      try {
        const parsed = JSON.parse(decodeURIComponent(userCookie));
        setUserData(parsed);
      } catch (error) {
        console.error("Error parsing user cookie:", error);
        toast.error("Failed to load user data");
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("user");
    setIsLoggedIn(false);
    setUserData({});
    setMenuOpen(false);
    navigate("/");
    toast.success("Logged out successfully!");
  };

  const avatarSrc = userData.avatar
    ? `${userData.avatar}`
    : userimg;

  return (
    <nav className="bg-white shadow-md px-6 py-3 relative z-50 w-full">
      <div className="w-full flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-14 object-contain rounded-lg" />
          </Link>
        </div>

        {/* Right: Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 transition">Home</Link>
          <Link to="/profilelisting" className="text-gray-700 hover:text-indigo-600 transition">Find Match</Link>
          <Link to="/contact" className="text-gray-700 hover:text-indigo-600 transition">Contact</Link>
          <Link to="/gallery" className="text-gray-700 hover:text-indigo-600 transition">Gallery</Link>

          {/* Notifications */}
          <div className="relative">
            <Link to="/notification" className="text-gray-800">
              <BellIcon className="h-6 w-6" />
            </Link>
            {newMessages > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
                {newMessages}
              </span>
            )}
          </div>

          {/* Profile or Signup */}
          {isLoggedIn ? (
            <Link to="/profile">
              <img
                src={avatarSrc}
                alt="User avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
              />
            </Link>
          ) : (
            <Link to="/signup">
              <Button className="bg-indigo-600 text-white hover:bg-indigo-500 transition">Join Now</Button>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          {isLoggedIn ? (
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <img
                src={avatarSrc}
                alt="User avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
              />
            </button>
          ) : (
            <Link to="/signup">
              <Button className="bg-indigo-600 text-white hover:bg-indigo-500 transition">Join Now</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && isLoggedIn && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md p-4 flex flex-col space-y-4 md:hidden">
          <Link onClick={() => setMenuOpen(false)} to="/" className="text-gray-700 hover:text-indigo-600 transition">Home</Link>
          <Link onClick={() => setMenuOpen(false)} to="/profile" className="text-gray-700 hover:text-indigo-600 transition">Profile</Link>
          <Link onClick={() => setMenuOpen(false)} to="/profilelisting" className="text-gray-700 hover:text-indigo-600 transition">Find Match</Link>
          <Link onClick={() => setMenuOpen(false)} to="/contact" className="text-gray-700 hover:text-indigo-600 transition">Contact</Link>
          <Link onClick={() => setMenuOpen(false)} to="/gallery" className="text-gray-700 hover:text-indigo-600 transition">Gallery</Link>
          <Link onClick={() => setMenuOpen(false)} to="/notification" className="text-gray-700 hover:text-indigo-600 transition">Notifications</Link>
          <button onClick={handleLogout} className="text-indigo-600 font-semibold text-left hover:underline">Logout</button>
        </div>
      )}
    </nav>
  );
}
