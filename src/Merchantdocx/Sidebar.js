import React from "react";
import { Link } from "react-router-dom";
import { FaBox, FaTags, FaImage, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md h-full">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-gray-800">Merchant Panel</h1>
      </div>
      <nav className="mt-6">
        <ul className="space-y-4">
          <li>
            <Link to="/getproduct" className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-200">
              <FaBox className="text-lg" /> Products
            </Link>
          </li>
          <li>
            <Link to="/getcategories" className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-200">
              <FaTags className="text-lg" /> Categories
            </Link>
          </li>
          <li>
            <Link to="/getbanners" className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-200">
              <FaImage className="text-lg" /> Banners
            </Link>
          </li>
          <li>
            <Link to="/" className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-200">
              <FaSignOutAlt className="text-lg" /> Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
