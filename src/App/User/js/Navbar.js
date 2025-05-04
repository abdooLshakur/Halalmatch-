import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "../js/Button";
import { BellIcon } from "@heroicons/react/24/outline";
import logo from "../images/logo.png";
import { toast } from "react-toastify";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [newMessages, setNewMessages] = useState(0);
  const api = "https://api.zmhcollections.online";
  const navigate = useNavigate();

  useEffect(() => {
    const userCookie = Cookies.get("user");

    if (userCookie) {
      setIsLoggedIn(true);
      try {
        const parsed = JSON.parse(userCookie);
        setUserData(parsed);
      } catch (error) {
        toast.error("Error parsing user cookie:", error);
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

  return (
    <nav className="flex items-center justify-between p-2 bg-white shadow relative">
      <div className="flex items-center">
        <Link to={"/"}>
          <img src={logo} alt="Logo" className="w-50 h-20 object-contain rounded-lg" />
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="space-x-5 hidden md:flex items-center">
        <Link to={"/"} className="text-slate-700 hover:text-indigo-600">Home</Link>
        <Link to={"/profilelisting"} className="text-slate-700 hover:text-indigo-600">Find Match</Link>
        <Link to={"/contact"} className="text-slate-700 hover:text-indigo-600">Contact</Link>
        <Link to={"/"} className="text-slate-700 hover:text-indigo-600">How It Works</Link>

        <div className="relative">
          <Link to={"/notification"} className="text-gray-800">
            <BellIcon className="h-6 w-6" />
          </Link>
          {newMessages > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {newMessages}
            </span>
          )}
        </div>

        {isLoggedIn ? (
          <Link to={"/profile"}>
            <img
              src={userData.avatar ? `${api}/${userData.avatar}` : "/placeholder.jpg"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
            />
          </Link>
        ) : (
          <Link to={"/signup"}>
            <Button className="bg-indigo-500 text-white">Join Now</Button>
          </Link>
        )}
      </div>

      {/* Mobile: avatar or join button */}
      <div className="md:hidden">
        {isLoggedIn ? (
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <img
              src={userData.avatar ? `${api}/${userData.avatar}` : "/placeholder.jpg"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
            />
          </button>
        ) : (
          <Link to={"/signup"}>
            <Button className="bg-indigo-500 text-white">Join Now</Button>
          </Link>
        )}
      </div>

      {/* Mobile dropdown */}
      {menuOpen && isLoggedIn && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md p-4 flex flex-col space-y-4 md:hidden z-50">
          <Link onClick={() => setMenuOpen(false)} to={"/"} className="text-slate-700 hover:text-indigo-600">Home</Link>
          <Link onClick={() => setMenuOpen(false)} to={"/profile"} className="text-slate-700 hover:text-indigo-600">Profile</Link>
          <Link onClick={() => setMenuOpen(false)} to={"/profilelisting"} className="text-slate-700 hover:text-indigo-600">Find Match</Link>
          <Link onClick={() => setMenuOpen(false)} to={"/contact"} className="text-slate-700 hover:text-indigo-600">Contact</Link>
          <Link onClick={() => setMenuOpen(false)} to={"/"} className="text-slate-700 hover:text-indigo-600">How It Works</Link>
          <Link onClick={() => setMenuOpen(false)} to={"/notification"} className="text-slate-700 hover:text-indigo-600">Notifications</Link>
          <button onClick={handleLogout} className="text-red-600 font-semibold text-left">Logout</button>
        </div>
      )}
    </nav>
  );
}
