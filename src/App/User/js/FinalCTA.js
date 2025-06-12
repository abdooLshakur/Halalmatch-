import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export default function FinalCTA() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

useEffect(() => {
  const userCookie = Cookies.get("user");

  if (userCookie) {
    setIsLoggedIn(true);
    try {
      // decode before parsing!
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



  return (
    <section className="py-16 bg-indigo-600 text-white text-center">
      {isLoggedIn ? (
        <>
          <h2 className="text-3xl font-bold mb-4">You're all set, {userName}!</h2>
          <p className="mb-6 text-lg">Explore your matches and start meaningful conversations today.</p>
          <Link to="/profilelisting">
            <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100">
              See matches
            </button>
          </Link>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-4">Ready to Meet Your Match?</h2>
          <p className="mb-6 text-lg">Join thousands of Muslims on a halal path to marriage.</p>
          <Link to="/signup">
            <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100">
              Get Started Now
            </button>
          </Link>
        </>
      )}
    </section>
  );
}
