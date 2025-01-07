import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const BannerManagement = () => {
  const [bannerheader, setbannerheader] = useState("")
  const [bannerimg, setbannerimg] = useState("")
  const [bannerdescp, setbannerdescp] = useState("")
  const [bannerlink, setbannerlink] = useState("")
  const Navigate = useNavigate()
  const [error, setError] = useState(false)


 const handleEvent = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("banner_img", bannerimg);
  formData.append("banner_header", bannerheader);
  formData.append("banner_descp", bannerdescp);
  formData.append("banner_link", bannerlink);
  console.log(formData)
  fetch(`http://localhost:9000/api/add-banner`, {
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
        alert("Banner successfully Created");
        Navigate("/dashboard"); 
      
      } else {
        setError(true);
        alert(body.message); 
      }
    })
    .catch((err) => {
      console.error(err);
      setError(true);
      alert("An error occurred Adding Banner. Please try again.");
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
  
    {/* Form Container */}
    <div className="max-w-4xl w-full mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Add Banners</h2>
      <form onSubmit={handleEvent} className="space-y-6">
        {/* Banner Title */}
        <div>
          <label htmlFor="bannerheader" className="block text-sm font-medium text-gray-700">
            Banner Title
          </label>
          <input
            type="text"
            id="bannerheader"
            placeholder="Enter banner title"
            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={bannerheader}
            onChange={(e) => setbannerheader(e.target.value)}
            required
          />
          {error && !bannerheader && (
            <p className="text-red-500 text-sm mt-2">Please enter a banner title</p>
          )}
        </div>
  
        {/* Banner Description */}
        <div>
          <label htmlFor="bannerdescp" className="block text-sm font-medium text-gray-700">
            Banner Description
          </label>
          <input
            type="text"
            id="bannerdescp"
            placeholder="Enter banner description"
            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={bannerdescp}
            onChange={(e) => setbannerdescp(e.target.value)}
            required
          />
          {error && !bannerdescp && (
            <p className="text-red-500 text-sm mt-2">Please enter a banner description</p>
          )}
        </div>
  
        {/* Banner Image */}
        <div>
          <label htmlFor="bannerimg" className="block text-sm font-medium text-gray-700">
            Banner Image
          </label>
          <input
            type="file"
            id="bannerimg"
            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e) => setbannerimg(e.target.files[0])}
            required
          />
          {error && !bannerimg && (
            <p className="text-red-500 text-sm mt-2">Please upload a banner image</p>
          )}
        </div>
  
        {/* Redirect Link */}
        <div>
          <label htmlFor="bannerlink" className="block text-sm font-medium text-gray-700">
            Redirect Link
          </label>
          <input
            type="url"
            id="bannerlink"
            placeholder="Enter redirect link"
            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={bannerlink}
            onChange={(e) => setbannerlink(e.target.value)}
            required
          />
          {error && !bannerlink && (
            <p className="text-red-500 text-sm mt-2">Please enter a redirect link</p>
          )}
        </div>
  
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Add Banner
        </button>
      </form>
    </div>
  </div>
  
  );
};

export default BannerManagement;
