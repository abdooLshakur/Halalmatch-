import React from "react";

const ResponsiveTable = ({ data, onEdit, onVerify, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="text-left px-6 py-4">#</th>
            <th className="text-left px-6 py-4">Name</th>
            <th className="text-left px-6 py-4">Type</th>
            <th className="text-left px-6 py-4">Status</th>
            <th className="text-left px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className="hover:bg-gray-100 border-b border-gray-200"
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4 capitalize">{item.type}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    item.status === "verified"
                      ? "bg-green-200 text-green-700"
                      : "bg-yellow-200 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 flex gap-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  onClick={() => onVerify(item)}
                >
                  Verify
                </button>
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
