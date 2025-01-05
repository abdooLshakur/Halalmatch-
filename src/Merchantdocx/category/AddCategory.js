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
  fetch(`https://3bf8-102-91-93-50.ngrok-free.app/api/create-category/${merchantid}`, {
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
    <div className="categories banners max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h2 style={{fontSize:"30px", textAlign:"center"}}>Manage Categories</h2>
      <form onSubmit={handleEvent}>
        <input type="text" placeholder="Category Name" className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" value={categoryname} onChange={(e) => setcategoryname(e.target.value)} required />
        <input
          type="file"
          placeholder="Banner Image"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          onChange={(e) => setcategoryicon(e.target.files[0])} 
          required
        />

        {error === true && !categoryicon ? (
          <span className="error-span01">Please upload an avatar</span>
        ) : null}
        <button type="submit"className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300">Add Category</button>
      </form>
     
    </div>
  );
};

export default CategoryManagement;
