import React from "react";
import { Link } from "react-router-dom";

const ResponsiveTable = ({ data, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="text-left px-6 py-4">#</th>
            <th className="text-left px-6 py-4">Name</th>
            <th className="text-left px-6 py-4">Type</th>
            <th className="text-left px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item._id}
              className="hover:bg-gray-100 border-b border-gray-200"
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">
                {item.icon ? (
                  <img
                    src={`https://3bf8-102-91-93-50.ngrok-free.app/${item.icon}`}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </td>
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4 flex gap-2">
                {/* Pass category data via state */}
                <Link
                  to={`/edit-category/${item._id}`}
                  onClick={() => localStorage.setItem("categoryData", JSON.stringify(item))}
                >
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Edit
                  </button>
                </Link>


                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => onDelete(item)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResponsiveTable;
