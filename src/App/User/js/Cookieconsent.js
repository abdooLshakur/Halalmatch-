import { useEffect, useState } from "react";

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(true);
    const api = "https://halal-t0ed.onrender.com";

  useEffect(() => {
   
  }, []);

  const handleAccept = async () => {
    try {
      // Save consent flag to localStorage
      
      // Make a request to the server to re-set cookies after user consent
      const response = await fetch(`${api}/reconsent`, {
          method: "POST",
          credentials: "include", // ensures cookies are included
        });
        
        if (!response.ok) {
            throw new Error("Failed to acknowledge consent");
        }
        
        setShowBanner(false);
        localStorage.setItem("cookie_consent", "accepted");
      // Optional: reload the app to ensure cookies are re-applied
      window.location.reload();
    } catch (err) {
      console.error("Consent handling error:", err);
    }
  };

  return (
    showBanner && (
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 z-50 shadow-lg">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-sm">
            We use cookies to improve your experience. By using our site, you agree to our use of cookies.
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
