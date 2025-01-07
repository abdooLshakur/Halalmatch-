import React from "react";
import ResponsiveTable from "./Table";
import { useState, useEffect } from "react";
const sampleData = [
  { id: 1, name: "Product A", type: "product", status: "verified" },
  { id: 2, name: "Category B", type: "category", status: "pending" },
  { id: 3, name: "Banner C", type: "banner", status: "verified" },
  { id: 4, name: "Merchant D", type: "merchant", status: "pending" },
];

const GetMerchants = () => {

  const [sampleData, setsampleData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/api/all-merchants")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setsampleData(data.data)
      })
      .catch((err) => {
        console.error(err);
        setsampleData([]);
      });
  }, []);

  const handleEdit = (item) => {
    alert(`Edit: ${item.name}`);
  };

  const handleVerify = (item) => {
    alert(`Verify: ${item.name}`);
  };

  const handleDelete = (item) => {
    alert(`Delete: ${item.name}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
<div className="flex items-center justify-between flex-wrap bg-white p-4 rounded-lg shadow-md">
  {/* Heading Section */}
  <div>
    <h1 className="text-2xl font-bold mb-2 md:mb-0">Manage Merchant</h1>
  </div>

  {/* Action Section */}
  <div>
    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
      Add New Merchant
    </button>
  </div>
</div>
      <ResponsiveTable
        data={sampleData}
        onEdit={handleEdit}
        onVerify={handleVerify}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default GetMerchants;
