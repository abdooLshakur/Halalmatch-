import React from "react";
import ResponsiveTable from "./Table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";

const GetBanner = () => {
  const [BannerData, setBanner] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // responsiveness sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1000) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchBanner = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:9000/api/banners");
      if (!response.ok) {
        throw new Error("Failed to fetch Banners");
      }
      const data = await response.json();
      setBanner(data.data);
    } catch (error) {
      setError("Failed to fetch Banners. Please try again.");
      console.error("Error fetching Banners:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBanner();
  }, []);




  const handleDelete = async (item) => {
    try {
      const response = await fetch(`http://localhost:9000/api/delete-banner/${item._id}`, {
        method: "DELETE",
        headers: { "Content-type": "Application/Json" },
      });
      if (!response.ok) {
        throw new Error("Failed to delete Banner");
      }
      alert(`Banner has been deleted.`);
      fetchBanner();
    } catch (error) {
      console.error(error);
      alert("Error deleting Banner. Please try again.");
    }
  };

  return (
    <div className="flex w-screen h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } xl:relative xl:translate-x-0 w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out z-10`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 overflow-y-auto">
        {/* Toggle Button for Mobile */}
        <button
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
            if (!isSidebarOpen) {
              document.body.classList.add("overflow-hidden");
            } else {
              document.body.classList.remove("overflow-hidden");
            }
          }}
          className="xl:hidden fixed top-4 left-4 bg-gray-800 text-white p-2 rounded z-20"
        >
          {isSidebarOpen ? "Close" : "Menu"}
        </button>

        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="flex items-center justify-between flex-wrap bg-white p-4 rounded-lg shadow-md">
            {/* Heading Section */}
            <div>
              <h1 className="text-2xl font-bold mb-2 md:mb-0">Manage Banners</h1>
            </div>

            {/* Action Section */}
            <div>

              <Link to={"/create-banners"}> <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-950 transition">
                Add New
              </button>
              </Link>
            </div>
          </div>      
          <ResponsiveTable
            data={BannerData}
            onDelete={handleDelete}
          />
          {loading && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default GetBanner;
