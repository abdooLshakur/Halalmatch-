

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Merchantdocx/merchant/Login";
import Signup from "./Merchantdocx/merchant/Signup";
import CreateProduct from "./Merchantdocx/product/AddProduct";
import CategoryManagement from "./Merchantdocx/category/AddCategory";
import BannerManagement from "./Merchantdocx/banner/AddBanner";
import Dashboard from "./Merchantdocx/Dashboard";
import GetCategory from "./Merchantdocx/category/GetCategory";
import GetBanner from "./Merchantdocx/banner/GetBanners";
import GetProduct from "./Merchantdocx/product/GetProducts";
import GetMerchant from "./Merchantdocx/merchant/GetMerchant";
import EditCategoryPage from "./Merchantdocx/category/EditCategory";
import Editbanner from "./Merchantdocx/banner/EditBanner";
import EditProduct from "./Merchantdocx/product/EditProduct";

function App() {

  return (
    <Router>
     

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/merchants" element={<GetMerchant />} />

            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/getproduct" element={<GetProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />

            <Route path="/create-categories" element={<CategoryManagement />} />
            <Route path="/getcategories" element={<GetCategory />} />
            <Route path="/edit-category/:id" element={<EditCategoryPage />} />

            <Route path="/create-banners" element={<BannerManagement />} />
            <Route path="/getbanners" element={<GetBanner />} />
            <Route path="/edit-banner/:id" element={<Editbanner />} />

            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
       
    </Router>
  );
}

export default App;
