import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from 'axios';

function CreateProduct() {
  const [title, setTitle] = useState("");
  const [descp, setDescp] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [img, setImg] = useState("");
  const [currency, setCurrency] = useState("");
  const [minq, setMinq] = useState("");
  const [maxq, setMaxq] = useState("");
  const [discount, setDiscount] = useState("");
  const [error, setError] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [categoryid, setCategoryid] = useState("");
  const [merchantid, setMerchantid] = useState("");

  useEffect(() => {
    const storedmerchant = localStorage.getItem("merchant");
    if (storedmerchant) {
      setMerchantid(storedmerchant.replace(/"/g, ""));
    }
  }, []);


  // const getImagesUrl = async (img) => {
  //   let id = "231080057";
  //   let formData = new FormData();
  //   let urls = [];
  //   formData.append("id", id);

  //   formData.append("image", img);

  //   try {
  //     const response = await axios.post('http://bucket.reworkstaging.name.ng/resources', formData);
      
  //     // Ensure the response structure matches your API
  //     if (response.data && response.data.data) {
  //       urls = response.data.data.map((x) => x.url);
  //       // console.log(urls);
  //       return urls;
  //     } else {
  //       console.error('Unexpected response structure:', response.data);
  //       return [];
  //     }
  //   } catch (error) {
  //     console.error('Error uploading images:', error);
  //     return [];
  //   }
  // };
  

  // const handleCreateProduct = async (e) => {
  //   e.preventDefault();
  //   let imgs = await getImagesUrl(img)
  //   if (
  //     title === "" ||
  //     descp === "" ||
  //     price === "" ||
  //     brand === "" ||
  //     quantity === "" ||
  //     img === "" ||
  //     currency === "" ||
  //     minq === "" ||
  //     maxq === "" ||
  //     discount === "" ||
  //     categoryid === ""
  //   ) {
  //     setError(true);
  //     return;
  //   }
  //      if (!img) {
  //     setError(true);
  //   } else {
  //     setError(false);
  //     getImagesUrl(img);
  //   }
  //   console.log(img)

  //   let DataObject = {
  //     title: title,
  //     descp: descp,
  //     price: price,
  //     brand: brand,
  //     quantity: quantity,
  //     images: imgs,
  //     currency: currency,
  //     min_qty: minq,
  //     max_qty: maxq,
  //     discount: discount,
  //     category_id: categoryid,
  //     merchant_id: merchantid,
  //   };
  //   console.log(DataObject);

   
  //   fetch(`http://ecommerce.reworkstaging.name.ng/v2/products`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(DataObject)
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setApiData(data);
  //       alert("Product successfully created");
  //       console.log(apiData);
  //     }) 
  //     .catch((err) => {
  //       alert("Error creating product", err);
  //     });
  // };

  // Fetch categories
  
  const getImagesUrl = async (img) => {
    let id = "231080057";
    let formData = new FormData();
    let urls = [];
    formData.append("id", id);
    formData.append("image", img);

    try {
      const response = await axios.post('http://bucket.reworkstaging.name.ng/resources', formData);
      
      if (response.data && response.data.data) {
        urls = response.data.data.map((x) => x.url);
        return urls;
      } else {
        console.error('Unexpected response structure:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      return [];
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    
    if (
      title === "" ||
      descp === "" ||
      price === "" ||
      brand === "" ||
      quantity === "" ||
      !img ||
      currency === "" ||
      minq === "" ||
      maxq === "" ||
      discount === "" ||
      categoryid === ""
    ) {
      setError(true);
      return;
    }

    setError(false);
    let imgs = await getImagesUrl(img);
    
    let DataObject = {
      title: title,
      descp: descp,
      price: price,
      brand: brand,
      quantity: quantity,
      images: imgs,
      currency: currency,
      min_qty: minq,
      max_qty: maxq,
      discount: discount,
      category_id: categoryid,
      merchant_id: merchantid,
    };
    console.log(DataObject);

    fetch(`http://ecommerce.reworkstaging.name.ng/v2/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(DataObject)
    })
      .then((resp) => resp.json())
      .then((data) => {
        setApiData(data);
        alert("Product successfully created");
        console.log(apiData);
      }) 
      .catch((err) => {
        alert("Error creating product", err);
      });
  };

  const [categorydata, setCategoryData] = useState([]);
  useEffect(() => {
    if (merchantid) {
      fetch(`http://ecommerce.reworkstaging.name.ng/v2/categories?merchant_id=${merchantid}`)
        .then((resp) => resp.json())
        .then((data) => {
          setCategoryData(data);
          // console.log(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [merchantid]);

  return (
    <>
      <div className="dash">
        <div>
          <Sidebar />
        </div>
        <div className="mainbody">
          <div className="register-container">
            <div><h1>Create Product</h1></div>
            <form onSubmit={handleCreateProduct}>
              <div>
                <label>Product Title</label><br />
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                {error && title === "" ? <span className="error-span01">Please enter title</span> : null}
              </div>
              <div>
                <label>Add Product Description</label><br />
                <input type="text" value={descp} onChange={(e) => setDescp(e.target.value)} />
                {error && descp === "" ? <span className="error-span01">Please enter description</span> : null}
              </div>
              <div>
                <label>Product Price</label><br />
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                {error && price === "" ? <span className="error-span01">Please enter price</span> : null}
              </div>
              <div>
                <label>Product Brand</label><br />
                <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
                {error && brand === "" ? <span className="error-span01">Please enter your brand</span> : null}
              </div>
              <div>
                <label>Product Category</label><br />
                <select value={categoryid} onChange={(e) => setCategoryid(e.target.value)}>
                  {categorydata?.map((item) => (
                    <option value={item.id} key={item.id}>{item.name}</option>
                  ))}
                </select>
                {error && categoryid === "" ? <span className="error-span01">Please select a category</span> : null}
              </div>
              <div>
                <label>Product Quantity</label><br />
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                {error && quantity === "" ? <span className="error-span01">Please enter quantity</span> : null}
              </div>
              <div>
                <label>Product Image</label><br />
                <input type="file" onChange={(e) => setImg(e.target.files[0])} />
                {error && img === "" ? <span className="error-span01">Please enter image</span> : null}
              </div>
              <div>
                <label>Currency</label><br />
                <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} />
                {error && currency === "" ? <span className="error-span01">Please enter currency</span> : null}
              </div>
              <div>
                <label>Product Min-Quantity</label><br />
                <input type="text" value={minq} onChange={(e) => setMinq(e.target.value)} /><br />
                {error && minq === "" ? <span className="error-span01">Please enter min-quantity</span> : null}
              </div>
              <div>
                <label>Product Max-Quantity</label><br />
                <input type="text" value={maxq} onChange={(e) => setMaxq(e.target.value)} /><br />
                {error && maxq === "" ? <span className="error-span01">Please enter max-quantity</span> : null}
              </div>
              <div>
                <label>Prodcut Discount</label><br />
                <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} /><br />
                {error && discount === "" ? <span className="error-span01">Please enter discount</span> : null}
              </div>
              <div className="button"><button type="submit">Create Product</button></div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProduct;
