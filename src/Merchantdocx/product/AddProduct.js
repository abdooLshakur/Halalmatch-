import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const CreateProduct = () => {
  const [producttitle, setproducttitle] = useState("")
  const [productdescp, setproductdescp] = useState("")
  const [productimages, setproductimages] = useState("")
  const [productprice, setproductprice] = useState("")
  const [productcurrency, setproductcurrency] = useState("")
  const [productbrand, setproductbrand] = useState("")
  const [productqty, setproductqty] = useState("")
  const [productminqty, setproductminqty] = useState("")
  const [productmaxqty, setproductmaxqty] = useState("")
  const [productdiscount, setproductdiscount] = useState("")
  const [productshippinglocations, setproductshippinglocations] = useState("")
  const [merchantid, setMerchantId] = useState("");
  const [categoryid, setCategoryid] = useState("");

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
    formData.append("title", producttitle);
    formData.append("descp", productdescp);
    formData.append("images", productimages);
    formData.append("price", productprice);
    formData.append("currency", productcurrency);
    formData.append("quantity", productqty);
    formData.append("brand", productbrand);
    formData.append("discount", productdiscount);
    formData.append("min_qty", productminqty);
    formData.append("max_qty", productdiscount);
    formData.append("shipping_locations", productshippinglocations);
    console.log(formData)
    fetch(`http://localhost:9000/api/create-product/${merchantid}/${categoryid}`, {
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
          alert("Product successfully Created");
          Navigate("/getproduct");

        } else {
          setError(true);
          alert(body.message);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        alert("An error occurred Creating Product. Please try again.");
      });
  }
  const [categorydata, setCategoryData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/api/categories")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCategoryData(data.data)
      })
      .catch((err) => {
        console.error(err);
        setCategoryData([]);
      });
  }, []);
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 relative">
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
  
    {/* Create Product Form */}
    <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Create Product
      </h2>
      <form onSubmit={handleEvent} className="grid grid-cols-2 gap-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Product Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
            value={producttitle}
            onChange={(e) => setproducttitle(e.target.value)}
          />
        </div>
  
        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Price</label>
          <input
            type="number"
            placeholder="Price"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
            value={productprice}
            onChange={(e) => setproductprice(e.target.value)}
          />
        </div>
  
        {/* Description */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            placeholder="Description"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={productdescp}
            onChange={(e) => setproductdescp(e.target.value)}
          ></textarea>
        </div>
  
        {/* Currency */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Currency
          </label>
          <input
            type="text"
            placeholder="Currency"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
            value={productcurrency}
            onChange={(e) => setproductcurrency(e.target.value)}
          />
        </div>
  
        {/* Product Category */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Product Category
          </label>
          <select
            value={categoryid}
            onChange={(e) => setCategoryid(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value=""></option>
            {Array.isArray(categorydata) &&
              categorydata.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              ))}
          </select>
          {error && categoryid === "" && (
            <span className="text-red-500 text-sm mt-1 block">
              Please select a category
            </span>
          )}
        </div>
  
        {/* Other Fields */}
        {[
          { label: "Brand", value: productbrand, setter: setproductbrand },
          { label: "Discount", value: productdiscount, setter: setproductdiscount },
          {
            label: "Stock Quantity",
            value: productqty,
            setter: setproductqty,
            type: "number",
          },
          {
            label: "Min Order",
            value: productminqty,
            setter: setproductminqty,
            type: "number",
          },
          {
            label: "Max Order",
            value: productmaxqty,
            setter: setproductmaxqty,
            type: "number",
          },
          {
            label: "Shipping Locations",
            value: productshippinglocations,
            setter: setproductshippinglocations,
          },
        ].map(({ label, value, setter, type = "text" }) => (
          <div key={label}>
            <label className="block text-sm font-medium text-gray-600">
              {label}
            </label>
            <input
              type={type}
              placeholder={label}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
              value={value}
              onChange={(e) => setter(e.target.value)}
            />
          </div>
        ))}
  
        {/* Product Images */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Product Images
          </label>
          <input
            type="file"
            className="w-full p-3 border rounded-lg"
            multiple
            value={productimages}
            onChange={(e) => setproductimages(e.target.value)}
          />
        </div>
  
        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default CreateProduct;
