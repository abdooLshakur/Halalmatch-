import React, { useEffect, useState } from "react";
import ResponsiveTable from "./Table";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const api = "https://zmh-api.onrender.com";

  // Show Toast Messages
  const showToast = (message, type) => {
    toast[type](message); // 'success', 'error', 'warning', 'info'
  };

  // Sidebar Responsiveness
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

  // Fetch Categories
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!token) {
        showToast("Invalid token. Redirecting to login page...", "warning");
        navigate("/");
        return;
      }

      const response = await fetch(`${api}/api/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        switch (response.status) {
          case 401:
          case 403:
            showToast("Admin not logged in. Redirecting to login page...", "warning");
            navigate("/");
            break;
          case 500:
            showToast("Server error. Please try again later.", "error");
            break;
          default:
            showToast(`Error: ${errorMessage || "Failed to fetch categories."}`, "error");
        }
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      if (!data || !data.data) {
        throw new Error("Invalid response structure from the server.");
      }

      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      showToast("Failed to fetch categories. Please try again.", "error");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [token]);

  // Handle Delete Category
  const handleDelete = async (item) => {
    try {
      const response = await fetch(`${api}/api/delete-category/${item._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      showToast(`Category "${item.name}" has been deleted.`, "success");
      fetchCategories();
    } catch (error) {
      console.error(error);
      showToast("Error deleting category. Please try again.", "error");
    }
  };

  return (
    <div className="flex w-screen h-screen bg-gray-100">
      {/* Toast Notification Container */}
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
        {/* Toggle Button for Mobile */}
        <button
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
            document.body.classList.toggle("overflow-hidden", !isSidebarOpen);
          }}
          className="xl:hidden fixed top-4 left-4 bg-gray-800 text-white p-2 rounded z-20"
        >
          {isSidebarOpen ? "Close" : "Menu"}
        </button>

        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="flex items-center justify-between flex-wrap bg-white p-4 rounded-lg shadow-md">
            {/* Heading Section */}
            <h1 className="text-2xl font-bold">Manage Categories</h1>

            {/* Add New Button */}
            <Link to={"/create-categories"}>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-950 transition">
                Add New
              </button>
            </Link>
          </div>

          <ResponsiveTable data={categories} onDelete={handleDelete} />
          {loading && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default GetCategory;
