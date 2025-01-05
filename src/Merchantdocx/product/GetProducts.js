import React from "react";
import ResponsiveTable from "./Table";
import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import Sidebar from "../Sidebar";

const GetProduct = () => {
  const [ProductData, setProduct] = useState([]);
  const [merchantid, setMerchantId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const storedMerchant = localStorage.getItem("merchant");
    if (storedMerchant) {
      setMerchantId(storedMerchant.replace(/"/g, ""));
    }
  }, []);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://3bf8-102-91-93-50.ngrok-free.app/api/Products"); 
      if (!response.ok) {
        throw new Error("Failed to fetch Product");
      }
      const data = await response.json();
      setProduct(data.data);
    } catch (error) {
      setError("Failed to fetch Product. Please try again.");
      console.error("Error fetching Product:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProduct();
  }, []);

 
  const handleDelete = async (item) => {
    try {
      const response = await fetch(`https://3bf8-102-91-93-50.ngrok-free.app/api/delete-product/${item._id}`, {
        method: "DELETE",
        headers: { "Content-type": "Application/Json" },
      });
      if (!response.ok) {
        throw new Error("Failed to delete Banner");
      }
      alert(`Banner has been deleted.`);
      fetchProduct();
    } catch (error) {
      console.error(error);
      alert("Error deleting Banner. Please try again.");
    }
  };

  const handleTrending = async (item) => {
    try {
      const response = await fetch(`https://3bf8-102-91-93-50.ngrok-free.app/api/add_trending/${merchantid}/${item._id}`, {
        method: "Put",
        headers: { "Content-type": "Application/Json" },
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
      alert("Product added to trending successfully.");
      fetchProduct(); // Refresh the product list
    } catch (error) {
      console.error("Error adding product to trending:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };
  const handleFeatured = async (item) => {
    try {
      const response = await fetch(`https://3bf8-102-91-93-50.ngrok-free.app/api/add_featured/${merchantid}/${item._id}`, {
        method: "PUT",
        headers: { "Content-type": "Application/Json" },
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
      alert("Product added to trending successfully.");
      fetchProduct(); // Refresh the product list
    } catch (error) {
      console.error("Error adding product to trending:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };
  const removefromtrending = async (item) => {
    try {
      const response = await fetch(`https://3bf8-102-91-93-50.ngrok-free.app/api/remove_from_trending/${merchantid}/${item._id}`, {
        method: "Put",
        headers: { "Content-type": "Application/Json" },
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
      alert("Product added to trending successfully.");
      fetchProduct(); // Refresh the product list
    } catch (error) {
      console.error("Error adding product to trending:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };
  const removefromfeatured = async (item) => {
    try {
      const response = await fetch(`https://3bf8-102-91-93-50.ngrok-free.app/api/remeve_from_featured/${merchantid}/${item._id}`, {
        method: "Put",
        headers: { "Content-type": "Application/Json" },
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
      alert("Product added to trending successfully.");
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
        } md:relative md:translate-x-0 w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out`}
    >
      <Sidebar />
    </div>



    {/* Main Content */}
    <div className="flex-grow p-6 overflow-y-auto">
      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 bg-gray-800 text-white p-2 rounded"
      >
        {isSidebarOpen ? "Close" : "Menu"}
      </button>
    <div className="p-6 bg-gray-100 min-h-screen">
      
<div className="flex items-center justify-between flex-wrap bg-white p-4 rounded-lg shadow-md">
  {/* Heading Section */}
  <div>
    <h1 className="text-2xl font-bold mb-2 md:mb-0">Manage Products</h1>
  </div>

  {/* Action Section */}
  <div>
  
   <Link to={"/create-product"}> <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-950 transition">
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
      />{loading && <p>Loading...</p>}
    </div>
    </div>
    </div>
  );
};

export default GetProduct;
