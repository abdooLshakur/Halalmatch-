import React from "react";
import ResponsiveTable from "./Table";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import { useNavigate } from 'react-router-dom';

const GetProduct = () => {
  const [ProductData, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const api = "https://zmh-api.onrender.com"
  
  //  Helper function to show toast notifications
  const showToast = (message, type) => {
    console.log(`[${type.toUpperCase()}]: ${message}`);
  };

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

  // localstorage
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("merchant");

  // fetch product
  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!token) {
        showToast("Invalid token. Redirecting to login page...", "warning");
        navigate("/");
        return;
      }
      setLoading(true);
      const response = await fetch(`${api}/api/Products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();

        switch (response.status) {
          case 400:
            showToast("Bad Request: Invalid data provided.", "error");
            break;

          case 401:
            showToast("Admin not logged in. Redirecting to login page...", "warning");
            navigate("/");
            break;

          case 403:
            showToast("Admin not logged in. Redirecting to login page...", "warning");
            navigate("/");
            break;

          case 500:
            showToast("Server error. Please try again later.", "error");
            break;

          default:
            showToast("Failed to add product to trending. Please try again.", "error");
        }

        // Log the error for debugging
        console.error(`HTTP Error: ${response.status}`, errorMessage);

        // Throw error to terminate further execution
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      setProduct(data.data);
    } catch (error) {
      if (error.message.includes("NetworkError")) {
        showToast("Network error. Please check your connection and try again.", "error");
      } else {
        showToast("Failed to fetch categories. Please try again.", "error");
      }
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [token]);

  const handleDelete = async (item) => {
    try {
      const response = await fetch(`${api}/api/delete-product/${item._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(item._id)
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
            showToast("Failed to add product to trending. Please try again.", "error");
        }

        const body = await response.json();
        alert(body.message);
      }
      fetchProduct();
    } catch (error) {
      console.error(error);
      alert("Error deleting Banner. Please try again.");
    }
  };

  const handleTrending = async (item) => {
    try {
      const response = await fetch(`${api}/api/add_trending/${id}/${item._id}`, {
        method: "Put",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
            showToast("Failed to add product to trending. Please try again.", "error");
        }

        console.error(`HTTP Error: ${response.status}`, errorMessage);
        throw new Error(`HTTP Error: ${response.status}`);
      }

      // Success handling
      alert("Product added to trending successfully.");
      fetchProduct();
    } catch (error) {
      console.error("Error adding product to trending:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handleFeatured = async (item) => {
    try {
      const response = await fetch(`${api}/api/add_featured/${id}/${item._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
            showToast("Failed to add product to trending. Please try again.", "error");
        }

        console.error(`HTTP Error: ${response.status}`, errorMessage);
        throw new Error(`HTTP Error: ${response.status}`);
      }

      // Success handling
      alert("Product added to trending successfully.");
      fetchProduct(); // Refresh the product list
    } catch (error) {
      console.error("Error adding product to trending:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const removefromtrending = async (item) => {
    try {
      const response = await fetch(`${api}/api/remove_from_trending/${id}/${item._id}`, {
        method: "Put",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        // Check for specific status codes
        if (response.status === 400) {
          alert("Bad Request: Invalid data provided.");
        } else if (response.status === 404) {
          alert("Product not found. Please check the product ID.");
        } else if (response.status === 500) {
          alert("Server error. Please try again later.");
        } else {
          alert("Failed to add product to trending. Please try again.");
        }
        throw new Error(`HTTP Error: ${response.status}`);
      }

      // Success handling
      alert("Product removed from trending successfully.");
      fetchProduct(); // Refresh the product list
    } catch (error) {
      console.error("Error adding product to trending:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const removefromfeatured = async (item) => {
  const productid = item._id
    try {
      const response = await fetch(`${api}/api/remove_from_featured/${id}/${productid}`, {
        method: "Put",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        // Check for specific status codes
        if (response.status === 400) {
          alert("Bad Request: Invalid data provided.");
        } else if (response.status === 404) {
          alert("Product not found. Please check the product ID.");
        } else if (response.status === 500) {
          alert("Server error. Please try again later.");
        } else {
          alert("Failed to add product to trending. Please try again.");
        }
        throw new Error(`HTTP Error: ${response.status}`);
      }

      // Success handling
      alert("Product removed from trending successfully.");
      fetchProduct(); // Refresh the product list
    } catch (error) {
      console.error("Error adding product to trending:", error);
      alert("An unexpected error occurred. Please try again.");
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
              <h1 className="text-2xl font-bold mb-2 xl:mb-0">Manage Products</h1>
            </div>

            {/* Action Section */}
            <div>
              <Link to={"/create-product"}>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-950 transition">
                  Add New
                </button>
              </Link>
            </div>
          </div>

          <ResponsiveTable
            data={ProductData}
            onTrend={handleTrending}
            onFeatured={handleFeatured}
            onDelete={handleDelete}
            removefromfeatured={removefromfeatured}
            removefromtrending={removefromtrending}
          />
          {loading && <p>Loading...</p>}
        </div>
      </div>
    </div>


  );
};

export default GetProduct;
