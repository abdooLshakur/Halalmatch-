import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Gallery() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const api = "https://api.halalmatchmakings.com";

  const itemsPerPage = 15;

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

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />
      <Navbar />
      <section className="w-[99vw] max-w-full py-6 bg-white min-h-screen overflow-x-hidden">
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
                  key={event._id || event.id || index} // <- Best effort fallback
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <img
                    src={`${api}/${event.gallery_img}`}
                    alt={event.gallery_header || "Gallery Image"}
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
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-slate-700 text-lg font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

