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

  // Filter and paginate
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
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <ToastContainer />
      <div className="w-full lg:w-[85vw] px-4 py-6 bg-white">
        <h3 className="text-lg font-semibold">All Admins</h3>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search by name or email..."
          className="border p-2 rounded w-full max-w-md"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
        />

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow text-sm">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-center">Status</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAdmins.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="p-2 font-medium">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="p-2 max-w-[200px] truncate">{user.email}</td>
                  <td className="p-2 text-center">
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
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleUserAction(user._id)}
                      className={`px-3 py-1 rounded text-white text-xs ${
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
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No admins found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, index) => (
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
  );
};

export default AdminsComponent;
