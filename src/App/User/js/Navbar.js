import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "../js/Button";
import { Menu, X } from "lucide-react";
import { BellIcon } from '@heroicons/react/24/outline'
import logo from "../images/logo.png"
import { toast } from "react-toastify";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [newMessages, setNewMessages] = useState(0);  // Track new messages
  const api = "https://halal-t0ed.onrender.com";

  // // Fetch notifications function
  // const getNotifications = async () => {
  //   try {
  //     const response = await fetch(`${api}/getAllNotifications`, {
  //       method: 'GET',
  //       credentials: 'include',
  //     });
  //     const data = await response.json();

  //     // If the response is an object, ensure you're accessing the array
  //     const notifications = data.notifications || [];  // Adjust based on actual structure

  //     return notifications;
  //   } catch (error) {
  //     console.error("Error fetching notifications:", error);
  //     return [];  // Return an empty array if there's an error
  //   }
  // };

  useEffect(() => {
    const userCookie = Cookies.get("user");
  
    if (userCookie) {
      setIsLoggedIn(true);
      try {
        const parsed = JSON.parse(userCookie);
        setUserData(parsed);
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <nav className="flex items-center justify-between p-2 bg-white shadow relative">
      <div className="flex items-center">
        <Link to={"/"}><img src={logo} alt="Logo" className="w-50 h-20 object-contain rounded-lg " /></Link>
      </div>


      {/* Desktop menu */}
      <div className="space-x-5 hidden md:flex items-center">
        <Link to={"/"} className="text-slate-700 hover:text-indigo-600">Home</Link>
        <Link to={"/profilelisting"} className="text-slate-700 hover:text-indigo-600">Find Match</Link>
        <Link to={"/contact"} className="text-slate-700 hover:text-indigo-600">Contact</Link>
        <Link to={"/"} className="text-slate-700 hover:text-indigo-600">How It Works</Link>

        {/* Notification Bell */}
        <div className="relative">
          <button className="text-gray-800">
            <Link to={"/notification"}><BellIcon className="h-6 w-6" /></Link>
          </button>
          {/* Notification Badge */}
          {newMessages > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {newMessages}
            </span>
          )}
        </div>

        {isLoggedIn ? (
          <div className="flex items-center">
            <Link to={"/profile"}>
              <img
                src={(userData.avatar ? `${api}/${userData.avatar}` : "/placeholder.jpg")}
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
              />
            </Link>
          </div>
        ) : (
          <Link to={"/signup"}>
            <Button className="bg-indigo-500 text-white">Join Now</Button>
          </Link>
        )}
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-indigo-600">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md p-4 flex flex-col space-y-4 md:hidden z-50">
          <Link onClick={() => setMenuOpen(false)} to={"/"} className="text-slate-700 hover:text-indigo-600">Home</Link>
          <Link onClick={() => setMenuOpen(false)} to={"/profilelisting"} className="text-slate-700 hover:text-indigo-600">Find Match</Link>
          <Link onClick={() => setMenuOpen(false)} to={"/contact"} className="text-slate-700 hover:text-indigo-600">Contact</Link>
          <Link onClick={() => setMenuOpen(false)} to={"/"} className="text-slate-700 hover:text-indigo-600">How It Works</Link>

          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link to={"/profile"}>
                <img
                  src={(userData.avatar ? `${api}/${userData.avatar}` : "/placeholder.jpg")}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                />
              </Link>
            </div>
          ) : (
            <Link to={"/signup"} onClick={() => setMenuOpen(false)}>
              <Button className="bg-indigo-500 text-white w-full">Join Now</Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}