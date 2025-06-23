import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export default function FinalCTA() {
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
    <section className="py-20 bg-rose-600/90 text-white text-center">
      {isLoggedIn ? (
        <>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in-down">
            You're all set, <span className="text-yellow-300">{userName}</span>!
          </h2>
          <p className="mb-6 text-lg md:text-xl">
            Explore your matches and start meaningful conversations today.
          </p>
          <Link to="/profilelisting">
            <button className="bg-white text-rose-600 font-semibold px-8 py-3 rounded-xl shadow hover:bg-gray-100 transition">
              See Matches
            </button>
          </Link>
        </>
      ) : (
        <>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Ready to Meet Your Match?</h2>
          <p className="mb-6 text-lg md:text-xl">Join thousands of Muslims on a halal path to marriage.</p>
          <Link to="/signup">
            <button className="bg-white text-rose-600 font-semibold px-8 py-3 rounded-xl shadow hover:bg-gray-100 transition">
              Get Started Now
            </button>
          </Link>
        </>
      )}
    </section>
  );
}
