import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditCategoryPage = ({ onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryname, setcategoryname] = useState("");
  const [categoryicon, setcategoryicon] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { id } = useParams();  
  const api = "https://zmh-api.onrender.com"

  const [formData, setFormData] = useState({
    name: "",  
    icon: "",   
  });
 //  Helper function to show toast notifications
 const showToast = (message, type) => {
  console.log(`[${type.toUpperCase()}]: ${message}`);
};
  // Fetch the category data from localStorage or API using the ID
  useEffect(() => {
    const categoryData = JSON.parse(localStorage.getItem("categoryData"));
    if (categoryData && categoryData._id === id) {
      setFormData(categoryData);  
      setcategoryname(categoryData.name);
      setcategoryicon(categoryData.icon);
    } else {
      // Fetch category data from an API if needed
      console.log("Fetching data for category ID:", id);
    }
  }, [id]);  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("icon", categoryicon);
    formData.append("name", categoryname);

    try {
      const response = await fetch(`${api}/api/update-category/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        body: formData,
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

      const result = await response.json();
      console.log("Category updated:", result);
      navigate("/getcategories"); 
    } catch (err) {
      setError("Failed to update category. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
       {/* Back Button */}
    <div className="absolute top-4 left-4">
      <button
        className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
        onClick={() => window.history.back()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>
    </div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Edit Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4 my-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={categoryname}
              onChange={(e) => setcategoryname(e.target.value)} 
              required 
              className="w-full p-2 mt-1 border rounded-lg focus:ring-blue-300 focus:outline-none"
              placeholder="Enter category name"
            />
          </div>

          {/* Image Field */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            {formData.icon && typeof formData.icon === "string" && (
              <img
                src={`${api}/${formData.icon}`}
                alt="Category"
                className="w-24 h-24 object-cover rounded-lg my-2"
              />
            )}
            <input
              type="file"
              id="image"
              name="image"
              onChange={(e) => setcategoryicon(e.target.files[0])}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-blue-300 focus:outline-none"
            />
            {error === true && !categoryicon ? (
              <span className="error-span01">Please upload an avatar</span>
            ) : null}
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryPage;
