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
        `${API}/users/${userId}/verify`,
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
      console.error("Error updating user status:", error);
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
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
        <ToastContainer />
      <div className="w-full lg:w-[85vw] px-4 py-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">All Users</h3>
          <input
            type="text"
            placeholder="Search by name or email..."
            className="border px-3 py-1 rounded w-full max-w-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-sm border">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="p-2 border text-left">Name</th>
                <th className="p-2 border text-left">Email</th>
                <th className="p-2 border text-center">Status</th>
                <th className="p-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="p-2 border font-medium">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="p-2 border max-w-[200px] truncate">
                    {user.email}
                  </td>
                  <td className="p-2 border text-center">
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
                  <td className="p-2 border text-center">
                    <button
                      onClick={() => handleUserAction(user._id)}
                      className={`px-3 py-1 rounded text-white ${
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
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
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
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersComponent;
