import { useEffect, useState } from "react";

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShowBanner(false);

    // ✅ Call your cookie-setting logic here:
    // E.g., make a request that sets the `user` cookie
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
