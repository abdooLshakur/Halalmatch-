import { useEffect, useState } from "react";

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(true);
//   const api = "https://halal-t0ed.onrender.com";
const api = "http://localhost:8900";


  useEffect(() => {
    const consent = localStorage.getItem("consentGiven");
    if (consent === "true") {
      setShowBanner(false);
    }
  }, []);

  const handleAccept = async () => {
    try {
      const res = await fetch(`${api}/consent`, {
        method: "POST",
        credentials: "include", // allow cookie from backend
      });

      if (res.ok) {
        localStorage.setItem("consentGiven", "true");
        setShowBanner(false);
      } else {
        console.error("Consent API failed:", await res.text());
      }
    } catch (err) {
      console.error("Consent error:", err);
    }
  };

  return (
    showBanner && (
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 z-50 shadow-lg">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-sm">
            We use cookies to improve your experience. By clicking “Accept”, you consent to the use of cookies.
          </p>
          <button
            onClick={handleAccept}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-xl transition"
          >
            Accept Cookies
          </button>
        </div>
      </div>
    )
  );
}
