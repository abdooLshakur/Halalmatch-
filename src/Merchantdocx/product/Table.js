import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const ResponsiveTable = ({ data, onEdit, onFeatured, onTrend, onDelete, removefromtrending, removefromfeatured }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 20; 

  const featuredData = (data || []).filter((item) => item.is_featured === true);
const trendingData = (data || []).filter((item) => item.is_trending === true);

// Ensure they are always arrays
const featuredResult = featuredData.length > 0 ? featuredData : [];
const trendingResult = trendingData.length > 0 ? trendingData : [];

  
  
  

  // Get the current products to display based on pagination
  const offset = currentPage * productsPerPage;
  const currentProducts = (data || []).slice(offset, offset + productsPerPage);

  // Handle page change
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className="overflow-x-auto space-y-8">
      {/* All Products Table with Pagination */}
      <div>
        <h2 className="text-2xl font-bold mb-4">All Products</h2>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left px-6 py-4 font-medium">#</th>
              <th className="text-left px-6 py-4 font-medium">Icon</th>
              <th className="text-left px-6 py-4 font-medium">Name</th>
              <th className="text-left px-6 py-4 font-medium">Type</th>
              <th className="text-left px-6 py-4 font-medium">Price</th>
              <th className="text-left px-6 py-4 font-medium">Discount</th>
              <th className="text-left px-6 py-4 font-medium">Min Qty</th>
              <th className="text-left px-6 py-4 font-medium">Max Qty</th>
              <th className="text-left px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((item, index) => (
              <tr
                key={item._id}
                className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} border-b`}
              >
                <td className="px-6 py-4 font-medium text-gray-800">{offset + index + 1}</td>
                <td className="px-6 py-4">
                  {item.images ? (
                    <img
                      src={`headers: { "Content-type": "Application/Json" },${item.images}`}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </td>
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4 capitalize">{item.brand}</td>
                <td className="px-6 py-4 text-green-600 font-semibold">
                  {item.currency} {item.price}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      item.discount > 0 ? "bg-green-200 text-green-700" : "bg-yellow-200 text-yellow-700"
                    }`}
                  >
                    {item.discount > 0 ? `${item.discount}% Off` : "No Discount"}
                  </span>
                </td>
                <td className="px-6 py-4">{item.min_qty}</td>
                <td className="px-6 py-4">{item.max_qty}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      to={`/edit-product/${item._id}`}
                      onClick={() => localStorage.setItem("productData", JSON.stringify(item))}
                    >
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      onClick={() => onTrend(item)}
                    >
                      Trend
                    </button>
                    <button
                      className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                      onClick={() => onFeatured(item)}
                    >
                      Featured
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => onDelete(item)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil((data || []).length / productsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"flex justify-center mt-4"}
          pageClassName={"px-3 py-1 border border-gray-300 rounded cursor-pointer"}
          activeClassName={"bg-blue-500 text-white"}
          disabledClassName={"text-gray-400 cursor-not-allowed"}
        />
      </div>

      {/* Featured Products Table */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left px-6 py-4 font-medium">#</th>
              <th className="text-left px-6 py-4 font-medium">Icon</th>
              <th className="text-left px-6 py-4 font-medium">Name</th>
              <th className="text-left px-6 py-4 font-medium">Type</th>
              <th className="text-left px-6 py-4 font-medium">Price</th>
              <th className="text-left px-6 py-4 font-medium">Discount</th>
              <th className="text-left px-6 py-4 font-medium">Min Qty</th>
              <th className="text-left px-6 py-4 font-medium">Max Qty</th>
              <th className="text-left px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {featuredResult.map((item, index) => (
              <tr
                key={item._id}
                className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} border-b`}
              >
                <td className="px-6 py-4 font-medium text-gray-800">{index + 1}</td>
                <td className="px-6 py-4">
                  {item.images ? (
                    <img
                      src={`https://3bf8-102-91-93-50.ngrok-free.app/${item.images}`}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </td>
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4 capitalize">{item.brand}</td>
                <td className="px-6 py-4 text-green-600 font-semibold">
                  {item.currency} {item.price}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      item.discount > 0 ? "bg-green-200 text-green-700" : "bg-yellow-200 text-yellow-700"
                    }`}
                  >
                    {item.discount > 0 ? `${item.discount}% Off` : "No Discount"}
                  </span>
                </td>
                <td className="px-6 py-4">{item.min_qty}</td>
                <td className="px-6 py-4">{item.max_qty}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      to={`/edit-product/${item._id}`}
                      onClick={() => localStorage.setItem("productData", JSON.stringify(item))}
                    >
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => removefromfeatured(item)}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Trending Products Table */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Trending Products</h2>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left px-6 py-4 font-medium">#</th>
              <th className="text-left px-6 py-4 font-medium">Icon</th>
              <th className="text-left px-6 py-4 font-medium">Name</th>
              <th className="text-left px-6 py-4 font-medium">Type</th>
              <th className="text-left px-6 py-4 font-medium">Price</th>
              <th className="text-left px-6 py-4 font-medium">Discount</th>
              <th className="text-left px-6 py-4 font-medium">Min Qty</th>
              <th className="text-left px-6 py-4 font-medium">Max Qty</th>
              <th className="text-left px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trendingResult.map((item, index) => (
              <tr
                key={item._id}
                className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} border-b`}
              >
                <td className="px-6 py-4 font-medium text-gray-800">{index + 1}</td>
                <td className="px-6 py-4">
                  {item.images ? (
                    <img
                      src={`headers: { "Content-type": "Application/Json" },${item.images}`}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </td>
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4 capitalize">{item.brand}</td>
                <td className="px-6 py-4 text-green-600 font-semibold">
                  {item.currency} {item.price}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      item.discount > 0 ? "bg-green-200 text-green-700" : "bg-yellow-200 text-yellow-700"
                    }`}
                  >
                    {item.discount > 0 ? `${item.discount}% Off` : "No Discount"}
                  </span>
                </td>
                <td className="px-6 py-4">{item.min_qty}</td>
                <td className="px-6 py-4">{item.max_qty}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      to={`/edit-product/${item._id}`}
                      onClick={() => localStorage.setItem("productData", JSON.stringify(item))}
                    >
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => removefromtrending(item)}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResponsiveTable;
