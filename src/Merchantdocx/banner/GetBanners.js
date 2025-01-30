import React, { useEffect, useState } from "react";
import ResponsiveTable from "./Table";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetBanner = () => {
  const [BannerData, setBanner] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const api = "https://zmh-api.onrender.com";

  // Show toast notifications
  const showToast = (message, type) => {
    toast[type](message);
  };

  // Handle sidebar responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1000);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch banners from API
  const fetchBanner = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!token) {
        showToast("Invalid token. Redirecting to login page...", "warning");
        navigate("/");
        return;
      }

      const response = await fetch(`${api}/api/banners`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        switch (response.status) {
          case 401:
          case 403:
            toast.error("Admin not logged in. Redirecting to login page...", "warning");
            navigate("/");
            break;
          case 500:
            toast.error("Server error. Please try again later.", "error");
            break;
          default:
            toast.error(`Error: ${errorMessage || "Failed to fetch banners."}`, "error");
        }
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      if (!data || !data.data) throw new Error("Invalid response structure from the server.");

      setBanner(data.data);
    } catch (error) {
      setError("Failed to fetch Banners. Please try again.");
      toast.error("Error fetching Banners. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, [token]);

  // Handle banner deletion
  const handleDelete = async (item) => {
    try {
      const response = await fetch(`${api}/api/delete-banner/${item._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete Banner");

      toast.success(`Banner has been deleted.`, "success");
      fetchBanner();
    } catch (error) {
      toast.error("Error deleting Banner. Please try again.", "error");
    }
  };

  return (
    <div className="flex w-screen h-screen bg-gray-100">
      <ToastContainer />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } xl:relative xl:translate-x-0 w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out z-10`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 overflow-y-auto">
        {/* Sidebar Toggle Button for Mobile */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="xl:hidden fixed top-4 left-4 bg-gray-800 text-white p-2 rounded z-20"
        >
          {isSidebarOpen ? "Close" : "Menu"}
        </button>

        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="flex items-center justify-between flex-wrap bg-white p-4 rounded-lg shadow-md">
            {/* Page Title */}
            <h1 className="text-2xl font-bold mb-2 md:mb-0">Manage Banners</h1>

            {/* Add New Button */}
            <Link to={"/create-banners"}>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-950 transition">
                Add New
              </button>
            </Link>
          </div>

          {/* Banners Table */}
          <ResponsiveTable data={BannerData} onDelete={handleDelete} />
          
          {/* Loading Indicator */}
          {loading && <p className="text-gray-600">Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default GetBanner;
