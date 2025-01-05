import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Main Container */}
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 md:p-10 mx-auto">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">Merchant Dashboard</h1>
          <p className="text-gray-500 mt-2">Manage your products, categories, and more</p>
        </header>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create Product */}
          <div className="p-6 bg-blue-500 text-white rounded-lg shadow-md flex flex-col items-center">
            <svg className="w-12 h-12 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 15h2v-6h-2v6zm0-8h2V7h-2v2z" />
            </svg>
            <h2 className="text-xl font-bold">Create Product</h2>
            <p className="mt-2 text-sm text-gray-100 text-center">Add new products to your store inventory.</p>
            <button className="mt-4 px-4 py-2 bg-white text-blue-500 font-bold rounded hover:bg-gray-100">Go</button>
          </div>

          {/* Create Category */}
          <div className="p-6 bg-green-500 text-white rounded-lg shadow-md flex flex-col items-center">
            <svg className="w-12 h-12 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 15h2v-6h-2v6zm0-8h2V7h-2v2z" />
            </svg>
            <h2 className="text-xl font-bold">Create Category</h2>
            <p className="mt-2 text-sm text-gray-100 text-center">Organize your products with categories.</p>
            <button className="mt-4 px-4 py-2 bg-white text-green-500 font-bold rounded hover:bg-gray-100">Go</button>
          </div>

          {/* Create Banner */}
          <div className="p-6 bg-yellow-500 text-white rounded-lg shadow-md flex flex-col items-center">
            <svg className="w-12 h-12 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 15h2v-6h-2v6zm0-8h2V7h-2v2z" />
            </svg>
            <h2 className="text-xl font-bold">Create Banner</h2>
            <p className="mt-2 text-sm text-gray-100 text-center">Add promotional banners to your store.</p>
            <button className="mt-4 px-4 py-2 bg-white text-yellow-500 font-bold rounded hover:bg-gray-100">Go</button>
          </div>

          {/* Login */}
          <div className="p-6 bg-purple-500 text-white rounded-lg shadow-md flex flex-col items-center">
            <svg className="w-12 h-12 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 15h2v-6h-2v6zm0-8h2V7h-2v2z" />
            </svg>
            <h2 className="text-xl font-bold">Login</h2>
            <p className="mt-2 text-sm text-gray-100 text-center">Access your merchant account.</p>
            <button className="mt-4 px-4 py-2 bg-white text-purple-500 font-bold rounded hover:bg-gray-100">Go</button>
          </div>

          {/* Signup */}
          <div className="p-6 bg-red-500 text-white rounded-lg shadow-md flex flex-col items-center">
            <svg className="w-12 h-12 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 15h2v-6h-2v6zm0-8h2V7h-2v2z" />
            </svg>
            <h2 className="text-xl font-bold">Signup</h2>
            <p className="mt-2 text-sm text-gray-100 text-center">Register a new merchant account.</p>
            <button className="mt-4 px-4 py-2 bg-white text-red-500 font-bold rounded hover:bg-gray-100">Go</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
