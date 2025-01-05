import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = ({ onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Banner ID from URL params
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

  // Load existing banner data
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
      if (formData[key] instanceof File || formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(`https://3bf8-102-91-93-50.ngrok-free.app/api/update-product/${id}`, {
        method: "PUT",
        headers: { "Content-type": "Application/Json" },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to update banner");
      }

      const result = await response.json();
      console.log("Banner updated:", result);
      navigate("/getproduct"); 
    } catch (err) {
      setError("Failed to update banner. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Banner</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              Banner Image
            </label>
            {formData.images && typeof formData.images === "string" && (
              <img
                src={formData.images}
                alt="Banner"
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

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter price"
            />
          </div>

          {/* Currency */}
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
              Currency
            </label>
            <input
              type="text"
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter currency"
            />
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter quantity"
            />
          </div>

          {/* Brand */}
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter brand"
            />
          </div>

          {/* Discount */}
          <div>
            <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
              Discount
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter discount percentage"
            />
          </div>

          {/* Min Quantity */}
          <div>
            <label htmlFor="min_qty" className="block text-sm font-medium text-gray-700">
              Minimum Quantity
            </label>
            <input
              type="number"
              id="min_qty"
              name="min_qty"
              value={formData.min_qty}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter minimum quantity"
            />
          </div>

          {/* Max Quantity */}
          <div>
            <label htmlFor="max_qty" className="block text-sm font-medium text-gray-700">
              Maximum Quantity
            </label>
            <input
              type="number"
              id="max_qty"
              name="max_qty"
              value={formData.max_qty}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter maximum quantity"
            />
          </div>

          {/* Shipping Locations */}
          <div>
            <label htmlFor="shipping_locations" className="block text-sm font-medium text-gray-700">
              Shipping Locations
            </label>
            <textarea
              id="shipping_locations"
              name="shipping_locations"
              value={formData.shipping_locations}
              onChange={handleChange}
              rows={2}
              className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter shipping locations (comma-separated)"
            />
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

export default EditProduct;
