import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import heroBg from "../images/bg.jpg"; 

export default function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        setIsLoggedIn(true);
        setUserName(user.name || "there");
      } catch (error) {
        console.error("Failed to parse user cookie:", error);
      }
    }
  }, []);

  return (
    <section
      className="relative bg-cover bg-top bg-no-repeat flex items-center justify-center h-[80vh]"
      style={{ backgroundImage: `url(${heroBg})` }}
    >

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Content */}
      <div className="text-center relative z-10 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
          Find Your Perfect Match the Halal Way
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto">
          A safe, respectful, and value-driven matchmaking platform tailored for Muslims worldwide.
        </p>

        {isLoggedIn ? (
          <>
            <div className="text-2xl md:text-3xl font-semibold text-white animate-pulse">
              👋 Welcome back, <span className="text-rose-300">{userName}</span>!
            </div>
            <div className="mt-6">
              <Link to="/profile">
                <Button className="bg-rose-600 text-white text-lg px-6 py-3 hover:bg-rose-500 transition">
                  Visit your Profile
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="space-x-4">
            <Link to="/signup">
              <Button className="bg-rose-600 text-white text-lg px-6 py-3 hover:bg-rose-500 transition">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="text-white border-white">
                Sign in
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
