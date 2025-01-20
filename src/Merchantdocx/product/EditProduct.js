import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = ({ onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { id } = useParams(); 

  //  Helper function to show toast notifications
  const showToast = (message, type) => {
    console.log(`[${type.toUpperCase()}]: ${message}`);
  };
  const [formData, setFormData] = useState({
    title: "",
    descp: "",
    images: "",
    price: "",
    currency: "",
    quantity: "",
    brand: "",
    discount: "",
    min_qty: "",
    max_qty: "",
    shipping_locations: "",
  });

  // Load existing product data
  useEffect(() => {
    const productData = JSON.parse(localStorage.getItem("productData"));
    if (productData && productData._id === id) {
      setFormData({
        title: productData.title || "",
        descp: productData.descp || "",
        images: productData.images || "",
        price: productData.price || "",
        currency: productData.currency || "",
        quantity: productData.quantity || "",
        brand: productData.brand || "",
        discount: productData.discount || "",
        min_qty: productData.min_qty || "",
        max_qty: productData.max_qty || "",
        shipping_locations: productData.shipping_locations || "",
      });
    }
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, images: file });
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
  
    try {
      const response = await fetch(`http://localhost:9000/api/update-product/${id}`, {
        method: "PUT",
        headers: { 
          Authorization: `Bearer ${token}`, // Include token
        },
        body: formDataToSend, // Send the FormData object
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
            showToast("Failed to update the product. Please try again.", "error");
        }
  
        console.error(`HTTP Error: ${response.status}`, errorMessage);
        throw new Error(`HTTP Error: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Product updated:", result);
      showToast("Product updated successfully!", "success");
      navigate("/getproduct");
    } catch (err) {
      setError("Failed to update product. Please try again.");
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

      {/* Centered Form */}
      <div className="flex flex-grow items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Edit Product
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 my-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter title"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="descp" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="descp"
                name="descp"
                value={formData.descp}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter description"
              />
            </div>

            {/* Image */}
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                product Image
              </label>
              {formData.images && typeof formData.images === "string" && (
                <img
                  src={formData.images}
                  alt="product"
                  className="w-32 h-32 object-cover rounded-lg mt-2"
                />
              )}
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleImageChange}
                className="w-full p-2 mt-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

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
    </div>



  );
};

export default EditProduct;
