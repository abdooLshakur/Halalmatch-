import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateGallery = () => {
  const [formData, setFormData] = useState({
    gallery_header: "",
    gallery_location: "",
    gallery_img: null,
  });
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const api = "https://api.halalmatchmakings.com";

  const handleChange = (e) => {
    if (e.target.name === "gallery_img") {
      const file = e.target.files[0];
      setFormData({ ...formData, gallery_img: file });
      setPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("gallery_header", formData.gallery_header);
    data.append("gallery_location", formData.gallery_location);
    data.append("Gallery_img", formData.gallery_img);

    try {
      await axios.post(`${api}/create-Gallery`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Gallery created successfully!");
      navigate("/GalleryTable");
    } catch (err) {
      toast.error("Failed to create gallery");
    }
  };

  return (
    <div className="min-h-screen w-[99vw] max-w-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-8">
      <ToastContainer />
      <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-md shadow-lg rounded-lg p-8">
        <button
          onClick={() => window.history.back()}
          className="mb-4 inline-block text-blue-600 hover:underline text-sm"
        >
          ← Back
        </button>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Create New Gallery</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Header</label>
            <input
              type="text"
              name="gallery_header"
              value={formData.gallery_header}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              placeholder="Enter header"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Location</label>
            <input
              type="text"
              name="gallery_location"
              value={formData.gallery_location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              placeholder="Enter location"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Image</label>
            <input
              type="file"
              name="gallery_img"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-white file:bg-blue-600 hover:file:bg-blue-700"
              required
            />
          </div>
          {preview && (
            <div className="mt-3">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover border rounded"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Create Gallery
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGallery;
