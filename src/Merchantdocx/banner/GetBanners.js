import React from "react";
import ResponsiveTable from "./Table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GetBanner = () => {
  const [BannerData, setBanner] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchBanner = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://3bf8-102-91-93-50.ngrok-free.app/api/banners"); 
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
      const response = await fetch(`https://3bf8-102-91-93-50.ngrok-free.app/api/delete-banner/${item._id}`, {
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
</div>      <ResponsiveTable
        data={BannerData}
        onDelete={handleDelete}
      />
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default GetBanner;
