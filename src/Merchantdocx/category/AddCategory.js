import React from "react";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
const CategoryManagement = () => {
  const [categoryname, setcategoryname] = useState("")
  const [categoryicon, setcategoryicon] = useState("")
  const [merchantid, setMerchantId] = useState("");
  const Navigate = useNavigate()
  const [error, setError] = useState(false)

  useEffect(() => {
    const storedMerchant = localStorage.getItem("merchant");
    if (storedMerchant) {
      setMerchantId(storedMerchant.replace(/"/g, ""));
    }
  }, []);
 const handleEvent = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("icon", categoryicon);
  formData.append("name", categoryname);
  console.log(formData)
  fetch(`http://localhost:9000/api/create-category/${merchantid}`, {
    method: "POST",
    body: formData,
  })
    .then(async (resp) => {
      const data = await resp.json();
      return { status: resp.status, body: data };
    })
    .then(({ status, body }) => {
      console.log(body); 
      if (status === 200 && body.success === true) {
        alert("Category successfully Created");
        Navigate("/getcategory"); 
      
      } else {
        setError(true);
        alert(body.message); 
      }
    })
    .catch((err) => {
      console.error(err);
      setError(true);
      alert("An error occurred Adding Category. Please try again.");
    });
 }
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
    <div className="max-w-4xl w-full mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Add Categories</h2>

      <form onSubmit={handleEvent} className="space-y-6 my-6">
        {/* Category Name */}
        <div>
          <label htmlFor="categoryname" className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            type="text"
            id="categoryname"
            placeholder="Enter category name"
            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={categoryname}
            onChange={(e) => setcategoryname(e.target.value)}
            required
          />
        </div>
  
        {/* Banner Image */}
        <div>
          <label htmlFor="categoryicon" className="block text-sm font-medium text-gray-700">
            Banner Image
          </label>
          <input
            type="file"
            id="categoryicon"
            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e) => setcategoryicon(e.target.files[0])}
            required
          />
          {/* Error Message */}
          {error === true && !categoryicon && (
            <p className="text-red-500 text-sm mt-2">Please upload an avatar</p>
          )}
        </div>
  
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Add Category
        </button>
      </form>
    </div>
  </div>
  
  );
};

export default CategoryManagement;
