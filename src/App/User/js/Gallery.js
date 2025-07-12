import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Gallery() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const api = "https://api.halalmatchmakings.com";
  const itemsPerPage = 15;
  const autoplayRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${api}/Gallerys`, { withCredentials: true })
      .then((res) => {
        setEvents(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch gallery");
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(events.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = events.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextImage = () => {
    if (selectedGallery) {
      setActiveImageIndex((prev) =>
        prev === selectedGallery.gallery_imgs.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedGallery) {
      setActiveImageIndex((prev) =>
        prev === 0 ? selectedGallery.gallery_imgs.length - 1 : prev - 1
      );
    }
  };

  // Optional Autoplay
  useEffect(() => {
    if (selectedGallery) {
      autoplayRef.current = setInterval(handleNextImage, 4000);
      return () => clearInterval(autoplayRef.current);
    }
  }, [selectedGallery]);

  // Swipe support for mobile
  const startXRef = useRef(0);
  const endXRef = useRef(0);

  const handleTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    endXRef.current = e.changedTouches[0].clientX;
    const delta = startXRef.current - endXRef.current;
    if (delta > 50) handleNextImage();
    else if (delta < -50) handlePrevImage();
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />
      <Navbar />
      <section className="min-w-[100vw] py-6 bg-white min-h-screen overflow-x-hidden">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">
          Our Recent Events & Programs
        </h2>

        <div className="max-w-8xl mx-auto px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
              <p className="text-blue-600 text-lg font-medium">
                Loading gallery...
              </p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {currentEvents.map((event, index) => (
                <div
                  key={event._id || index}
                  onClick={() => {
                    setSelectedGallery(event);
                    setActiveImageIndex(0);
                  }}
                  className="cursor-pointer bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <img
                    src={event.gallery_imgs?.[0]}
                    alt={event.gallery_header || "Gallery"}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-semibold text-slate-700 mb-1">
                      {event.gallery_header}
                    </h3>
                    <p className="text-slate-500">{event.gallery_location}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!loading && (
          <div className="flex justify-center mt-10 space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-slate-700 text-lg font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* MODAL POPUP PREVIEW */}
      {selectedGallery && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center px-4 py-10"
          onClick={() => setSelectedGallery(null)}
        >
          <div
            className="relative w-full max-w-5xl mx-auto rounded-xl bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/70 transition p-2 rounded-full"
              onClick={() => setSelectedGallery(null)}
            >
              ✕
            </button>

            {/* Image Slider */}
            <div className="relative">
              <img
                src={selectedGallery.gallery_imgs[activeImageIndex]}
                alt="Preview"
                className="w-full h-[60vh] object-cover rounded-t-xl transition duration-500 ease-in-out transform hover:scale-[1.01]"
              />

              {/* Overlay Text */}
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm max-w-[80%]">
                <h2 className="text-xl font-bold">{selectedGallery.gallery_header}</h2>
                <p className="text-sm">📍 {selectedGallery.gallery_location}</p>
              </div>

              {/* Nav Arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-black hover:bg-white p-2 rounded-full shadow-lg transition hover:scale-110"
              >
                ‹
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-black hover:bg-white p-2 rounded-full shadow-lg transition hover:scale-110"
              >
                ›
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-3 overflow-x-auto p-4 bg-white/20 backdrop-blur-sm">
              {selectedGallery.gallery_imgs.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-4 transition duration-200 cursor-pointer hover:scale-105 shadow-md ${activeImageIndex === i
                      ? "border-white shadow-white/30 scale-110"
                      : "border-transparent"
                    }`}
                  alt={`thumb-${i}`}
                />
              ))}
            </div>

            {/* Description */}
            <div className="px-6 pb-6 pt-2 text-white text-center bg-white/10 backdrop-blur-lg">
              {selectedGallery.gallery_description && (
                <p className="text-base italic text-white/80">
                  {selectedGallery.gallery_description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
