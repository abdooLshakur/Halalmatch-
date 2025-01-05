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
  fetch(`https://3bf8-102-91-93-50.ngrok-free.app/api/add-banner`, {
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
    <div className="banners max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h2 style={{textAlign:"center", fontSize:"30px"}}>Create Banners</h2>
      <form onSubmit={handleEvent}>
        <input type="text" placeholder="Banner Title" className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" value={bannerheader} onChange={(e) => setbannerheader(e.target.value)} required />
        {error === true && bannerheader === "" ? <span className="error-span01">please enter </span> : null}

        <input type="text" placeholder="Banner Description" className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" value={bannerdescp} onChange={(e) => setbannerdescp(e.target.value)} required />
        {error === true && bannerdescp=== "" ? <span className="error-span01">please enter </span> : null}

        <input
          type="file"
          placeholder="Banner Image"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          onChange={(e) => setbannerimg(e.target.files[0])} 
          required
        />

        {error === true && !bannerimg ? (
          <span className="error-span01">Please upload an avatar</span>
        ) : null}
        <input type="url" placeholder="Redirect Link" className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" value={bannerlink} onChange={(e) => setbannerlink(e.target.value)} required />
        {error === true && bannerlink === "" ? <span className="error-span01">please enter </span> : null}

        <button type="submit" className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300">Add Banner</button>
      </form>    
    </div>
  );
};

export default BannerManagement;
