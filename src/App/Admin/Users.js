import { useState, useEffect } from "react";
import axios from "axios";

const UsersComponent = () => {
    const [users, setUsers] = useState([]);
    const API = "https://yourapi.com";
    useEffect(() => {
      const fetchUsers = async () => {
        const { data } = await axios.get(`${API}/users`);
        setUsers(data);
      };
      fetchUsers();
    }, []);
  
    const handleUserAction = async (userId, action) => {
      await axios.put(`${API}/users/${userId}/${action.toLowerCase()}`);
    };
  
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">All Users</h3>
        <table className="min-w-full border text-sm rounded-md shadow-md">
          <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="p-2 border font-medium">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.verified ? "Activated" : "Pending"}</td>
                <td className="p-2 border text-center space-x-2">
                  {!user.verified ? (
                    <button
                      onClick={() => handleUserAction(user._id, "Activate")}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Activate
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUserAction(user._id, "Disable")}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Disable
                    </button>
                  )}
                  <button
                    onClick={() => alert(`Viewing ${user.name}`)}
                    className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default UsersComponent;