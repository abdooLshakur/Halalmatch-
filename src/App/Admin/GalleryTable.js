import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar"
import { Link } from "react-router-dom";
const GalleryTable = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const api = "http://localhost:8900";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [formValues, setFormValues] = useState({
    gallery_header: "",
    gallery_location: "",
  });
  useEffect(() => {
    axios.get(`${api}/Gallerys`,{
      withCredentials: true
    })
      .then(res => {
        setGalleryItems(res.data.data || []);
        setLoading(false);
      })
      .catch(err => {
        toast.error("Failed to fetch gallery");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this gallery item?")) return;

    try {
      await axios.delete(`${api}/delete-Gallery/${id}`,{
        withCredentials: true
      });
      setGalleryItems(galleryItems.filter(item => item._id !== id));
      toast.success("Gallery item deleted");
    } catch (err) {
      toast.error("Failed to delete item");
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormValues({
      gallery_header: item.gallery_header || "",
      gallery_location: item.gallery_location || "",
    });
    setPreviewImage(`${api}/${item.gallery_img}`);
    setIsModalOpen(true);
  };
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData();
    data.append("gallery_header", formValues.gallery_header);
    data.append("gallery_location", formValues.gallery_location);
    if (form.gallery_img.files[0]) {
      data.append("Gallery_img", form.gallery_img.files[0]);
    }
  
    console.log("Updating gallery with:");
    for (let pair of data.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
  
    try {
      const res = await axios.put(`${api}/update-Gallery/${selectedItem._id}`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const updatedItem = res.data.data;
      setGalleryItems(prev =>
        prev.map(item => item._id === updatedItem._id ? updatedItem : item)
      );
      toast.success("Gallery updated successfully");
      setIsModalOpen(false);
      setPreviewImage(null);
    } catch (err) {
      toast.error("Failed to update gallery");
      console.error("Update error:", err.response?.data || err.message);
    }
  };
  
  

  const totalPages = Math.ceil(galleryItems.length / itemsPerPage);
  const paginatedItems = galleryItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <p className="text-center mt-6">Loading gallery...</p>;

  return (
    <div className="flex">
      <ToastContainer/>
      <Sidebar/>
    <div className="w-[85vw] max-w-full px-6 py-6 bg-white min-h-screen overflow-x-hidden">
      <div className="flex justify-between">
      <h2 className="text-2xl font-bold mb-4">Gallery</h2>
      <Link to={"/CreateGallery"}><button className="text-2xl font-bold mb-4">Create</button></Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Header</th>
              <th className="py-2 px-4 text-left">Location</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="py-2 px-4">
                  <img
                    src={`${api}/${item.gallery_img}`}
                    alt={item.gallery_header}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4">{item.gallery_header}</td>
                <td className="py-2 px-4">{item.gallery_location}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Edit Modal */}
      {isModalOpen && selectedItem && (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
       <h3 className="text-xl font-bold mb-4">Edit Gallery Item</h3>

       <form onSubmit={handleUpdate} className="space-y-4">
        {/* Header Input */}
<div>
  <label className="block text-sm font-medium">Header</label>
  <input
    type="text"
    name="gallery_header"
    value={formValues.gallery_header}
    onChange={(e) =>
      setFormValues({ ...formValues, gallery_header: e.target.value })
    }
    className="w-full border rounded px-3 py-2 mt-1"
  />
</div>

{/* Location Input */}
<div>
  <label className="block text-sm font-medium">Location</label>
  <input
    type="text"
    name="gallery_location"
    value={formValues.gallery_location}
    onChange={(e) =>
      setFormValues({ ...formValues, gallery_location: e.target.value })
    }
    className="w-full border rounded px-3 py-2 mt-1"
  />
</div>


        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium">Image</label>
          <input
            type="file"
            name="gallery_img"
            accept="image/*"
            onChange={(e) =>
              setPreviewImage(
                e.target.files[0]
                  ? URL.createObjectURL(e.target.files[0])
                  : null
              )
            }
            className="w-full mt-1"
          />
        </div>

        {/* Preview */}
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="w-32 h-32 object-cover rounded mt-2"
          />
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => {
              setIsModalOpen(false);
              setPreviewImage(null);
            }}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
    </div>
  );
};

export default GalleryTable;
