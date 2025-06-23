import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminsComponent = () => {
  const [admins, setAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const adminsPerPage = 5;
  const API = "https://api.halalmatchmakings.com";

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get(`${API}/all-Admins`, {
          withCredentials: true,
        });
        setAdmins(data.data);
      } catch (err) {
        toast.error("Failed to fetch admins");
      }
    };
    fetchAdmins();
  }, []);

  const handleUserAction = async (userId) => {
    const user = admins.find((u) => u._id === userId);
    const newStatus = !user.isVerified;

    try {
      await axios.put(
        `${API}/admins/${userId}/verify`,
        { isVerified: newStatus },
        { withCredentials: true }
      );

      toast.success(`User ${newStatus ? "activated" : "disabled"} successfully`);
      setAdmins((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, isVerified: newStatus } : u))
      );
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  // Filtering and Pagination
  const filteredAdmins = admins.filter((admin) =>
    `${admin.first_name} ${admin.last_name} ${admin.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAdmins.length / adminsPerPage);
  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * adminsPerPage,
    currentPage * adminsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="flex w-full min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Sidebar />
      <ToastContainer />

      <div className="w-full md:w-[85vw] p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">All Admins</h3>
            <input
              type="text"
              placeholder="Search by name or email..."
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full md:w-80"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-md">
              <thead className="bg-indigo-500 text-white">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAdmins.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 border-t">
                    <td className="p-3 font-medium text-gray-800">
                      {user.first_name} {user.last_name}
                    </td>
                    <td className="p-3 max-w-xs truncate text-gray-700">{user.email}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          user.isVerified
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {user.isVerified ? "Activated" : "Pending"}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleUserAction(user._id)}
                        className={`px-4 py-1 rounded text-white text-xs transition-all duration-150 ${
                          user.isVerified
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {user.isVerified ? "Disable" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
                {paginatedAdmins.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-500">
                      No admins found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminsComponent;
