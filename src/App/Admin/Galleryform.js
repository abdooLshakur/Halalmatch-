import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateGallery = () => {
  const [formData, setFormData] = useState({
    gallery_header: "",
    gallery_location: "",
    gallery_description: "",
    Gallery_img: [],
  });

  const [preview, setPreview] = useState([]);
  const navigate = useNavigate();
  const api = "https://api.halalmatchmakings.com";

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "Gallery_img") {
      const selectedFiles = Array.from(files);
      setFormData((prev) => ({ ...prev, Gallery_img: selectedFiles }));
      setPreview(selectedFiles.map((file) => URL.createObjectURL(file)));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("gallery_header", formData.gallery_header);
    data.append("gallery_location", formData.gallery_location);
    data.append("gallery_description", formData.gallery_description);

    formData.Gallery_img.forEach((file) => {
      data.append("Gallery_img", file); 
    });

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
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              name="gallery_description"
              value={formData.gallery_description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              placeholder="Enter description"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Images</label>
            <input
              type="file"
              name="Gallery_img"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-white file:bg-blue-600 hover:file:bg-blue-700"
              required
            />
          </div>

          {preview.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-3">
              {preview.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Preview ${index + 1}`}
                  className="w-24 h-24 object-cover border rounded"
                />
              ))}
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
