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
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Gallery created successfully!");
      navigate("/GalleryTable");
      setFormData({ gallery_header: "", gallery_location: "", gallery_img: null });
      setPreview(null);
    } catch (err) {
      toast.error("Failed to create gallery");
    }
  };

  return (
    <div className="w-[99vw] max-w-full py-6 bg-white min-h-screen overflow-x-hidden">
      <ToastContainer />
      
      <button
        onClick={() => window.history.back()}
        className="mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Create New Gallery</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Header</label>
            <input
              type="text"
              name="gallery_header"
              value={formData.gallery_header}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter header"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              name="gallery_location"
              value={formData.gallery_location}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter location"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <input
              type="file"
              name="gallery_img"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover mt-2 rounded border"
            />
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Create Gallery
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGallery;
