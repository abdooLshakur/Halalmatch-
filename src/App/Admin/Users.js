import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UsersComponent = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const API = "https://api.halalmatchmakings.com";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${API}/users`, {
          withCredentials: true,
        });
        setUsers(data.data);
      } catch (error) {
        toast.error("Failed to load users");
      }
    };
    fetchUsers();
  }, []);

  const handleUserAction = async (userId) => {
    const user = users.find((u) => u._id === userId);
    const newStatus = !user.isVerified;

    try {
      await axios.put(
        `${API}/users/${userId}/manualverify`,
        { isVerified: newStatus },
        { withCredentials: true }
      );

      toast.success(`User ${newStatus ? "activated" : "disabled"} successfully`);

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === userId ? { ...u, isVerified: newStatus } : u
        )
      );
    } catch (error) {
      toast.error("Failed to update user. Please try again.");
    }
  };

  // Filtering
  const filteredUsers = users.filter(
    (user) =>
      user.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Sidebar />
      <ToastContainer />
      <div className="w-full md:w-[85vw] p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">All Users</h2>
          <input
            type="text"
            placeholder="Search by name or email..."
            className="border border-gray-300 shadow-sm px-4 py-2 rounded-lg w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white border border-gray-200 text-sm text-left">
            <thead className="bg-indigo-600 text-white text-xs uppercase">
              <tr>
                <th className="px-4 py-3 border">Name</th>
                <th className="px-4 py-3 border">Email</th>
                <th className="px-4 py-3 border text-center">Status</th>
                <th className="px-4 py-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 border-b">
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="px-4 py-3 text-gray-600 max-w-[250px] truncate">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${user.isVerified
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {user.isVerified ? "Activated" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleUserAction(user._id)}
                      className={`px-4 py-1.5 rounded-md text-white transition duration-200 ${user.isVerified
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                        }`}
                    >
                      {user.isVerified ? "Disable" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
              {currentUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                indexOfLastUser < filteredUsers.length ? prev + 1 : prev
              )
            }
            disabled={indexOfLastUser >= filteredUsers.length}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersComponent;
