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
    fetch(`https://3bf8-102-91-93-50.ngrok-free.app/api/create-product/${merchantid}/${categoryid}`, {
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
    fetch("https://3bf8-102-91-93-50.ngrok-free.app/api/categories")
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
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Product</h2>
      <form onSubmit={handleEvent} className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600">Product Name</label>
          <input
            type="text"
            placeholder="Product Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
            value={producttitle} onChange={(e) => setproducttitle(e.target.value)} />

        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Price</label>
          <input
            type="number"
            placeholder="Price"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
            value={productprice} onChange={(e) => setproductprice(e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-600">Description</label>
          <textarea
            placeholder="Description"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={productdescp} onChange={(e) => setproductdescp(e.target.value)}></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Currency</label>
          <input
            type="text"
            placeholder="Currency"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
            value={productcurrency} onChange={(e) => setproductcurrency(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Product Category</label><br />
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

          {error && categoryid === "" ? <span className="error-span01">Please select a category</span> : null}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Brand</label>
          <input
            type="text"
            placeholder="Brand"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
            value={productbrand} onChange={(e) => setproductbrand(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Discount</label>
          <input
            type="text"
            placeholder="Discount"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
            value={productdiscount} onChange={(e) => setproductdiscount(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Stock Quantity</label>
          <input
            type="number"
            placeholder="Stock Quantity"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
            value={productqty} onChange={(e) => setproductqty(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Min Order</label>
          <input
            type="number"
            placeholder="Min Oredr"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
            value={productminqty} onChange={(e) => setproductminqty(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Max Order</label>
          <input
            type="number"
            placeholder="Max Order"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
            value={productmaxqty} onChange={(e) => setproductmaxqty(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Shipping locations</label>
          <input
            type="text"
            placeholder="Shipping Locations"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
            value={productshippinglocations} onChange={(e) => setproductshippinglocations(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Product Images</label>
          <input
            type="file"
            className="w-full p-3 border rounded-lg"
            multiple
            value={productimages} onChange={(e) => setproductimages(e.target.value)} />
        </div>
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
  );
};

export default CreateProduct;
