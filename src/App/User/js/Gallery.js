import { useState, useEffect } from "react";
import Navbar from "./Navbar"
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Gallery() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const api = "http://localhost:8900";

  const itemsPerPage = 15;
  useEffect(() => {
    axios.get(`${api}/Gallerys`,{
      withCredentials: true
    })
      .then(res => {
        setEvents(res.data.data || []);
        setLoading(false);
      })
      .catch(err => {
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
    <Navbar/>
  <section className="w-[99vw] max-w-full py-6 bg-white min-h-screen overflow-x-hidden">
  <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">
    Our Recent Events & Programs
  </h2>

  {/* Centered and constrained content */}
  <div className="max-w-8xl mx-auto px-6">
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {currentEvents.map((event) => (
        <div
          key={event.id}
          className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <img
            src={`${api}/${event.gallery_img}`}
            alt={event.header}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 text-center">
            <h3 className="text-xl font-semibold text-slate-700 mb-1">{event.gallery_header}</h3>
            <p className="text-slate-500">{event.gallery_location}</p>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Pagination */}
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
</section>
</div>
  
  );
}
