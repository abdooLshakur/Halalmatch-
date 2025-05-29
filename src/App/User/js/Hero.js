import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "./Button";
import { Link } from "react-router-dom";

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
      className="relative bg-cover bg-center bg-no-repeat py-20 flex items-center justify-center h-[70vh]"
      style={{ backgroundImage: "url('src/App/User/images/honduras-iz19z6vw5uze6qne.jpg')" }} // replace with your actual image path
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Content */}
      <div className="text-center relative z-10 px-4">
        <h1 className="text-5xl font-bold text-white mb-4">
          Find Your Perfect Match the Halal Way
        </h1>
        <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
          A safe, respectful, and value-driven matchmaking platform tailored for Muslims worldwide.
        </p>

        {/* Conditional content */}
        {isLoggedIn ? (
          <>
            <div className="text-xl text-white font-semibold">
              👋 Welcome back, {userName}!
            </div>
            <div className="mt-4">
              <Link to="/profile">
                <Button className="bg-indigo-600 text-white">Visit your Profile</Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="space-x-4">
            <Link to="/signup">
              <Button className="bg-indigo-600 text-white">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline">Sign in</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
