import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminsComponent = () => {
    const [admins, setadmins] = useState([]);
    const API = "https://api.halalmatchmakings.com"
    useEffect(() => {
      const fetchadmins = async () => {
        const { data } = await axios.get(`${API}/all-Admins`,
          {
            withCredentials: true
          } 
        );
        setadmins(data.data);
      };
      fetchadmins();
    }, []);
  

    const handleUserAction = async (userId) => {
      const user = admins.find((u) => u._id === userId);
      const newStatus = !user.isVerified;
    
      try {
        const res = await axios.put(
          `${API}/admins/${userId}/verify`,
          { isVerified: newStatus },
          { withCredentials: true }
        );
    
        // Show toast based on status
        toast.success(`User ${newStatus ? 'activated' : 'disabled'} successfully`);
    
        // Update the admins list
        setadmins((prevadmins) =>
          prevadmins.map((u) =>
            u._id === userId ? { ...u, isVerified: newStatus } : u
          )
        );
      } catch (error) {
        console.error("Error updating user status:", error);
        toast.error('Failed to update user. Please try again.');
      }
    };
    
    
    

  
    return (
    <div className="flex">
      <Sidebar/>
      <div className="flex flex-col flex-grow space-y-4 p-4 w-full overflow-x-auto">
      <ToastContainer />
  <h3 className="text-lg font-semibold">All Admins</h3>
  <div className="w-[80vw] max-w-full py-6 bg-white min-h-screen overflow-x-hidden m-[0 auto]">
  <table className="min-w-full sm:min-w-[800px] w-full border text-sm rounded-md shadow-md">
    <thead className="bg-indigo-500 text-white">
      <tr>
        <th className="p-2 border text-left">Name</th>
        <th className="p-2 border text-left">Email</th>
        <th className="p-2 border text-center">Status</th>
        <th className="p-2 border text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
  {admins.map((user) => (
    <tr key={user._id} className="hover:bg-gray-50">
      <td className="p-2 border font-medium">
        {user.first_name} {user.last_name}
      </td>
      <td className="p-2 border max-w-[200px] truncate">{user.email}</td>
      
      {/* Status badge */}
      <td className="p-2 border text-center">
      <span
  className={`px-2 py-1 rounded text-xs font-semibold ${
    user.isVerified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
  }`}
>
  {user.isVerified ? "Activated" : "Pending"}
</span>

      </td>

      {/* Action buttons */}
      <td className="p-2 border text-center space-x-2">
        {!user.isVerified ? (
          <button
            onClick={() => handleUserAction(user._id)}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Activate
          </button>
        ) : (
          <button
            onClick={() => handleUserAction(user._id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Disable
          </button>
        )}
      </td>
    </tr>
  ))}
</tbody>

  </table>
  </div>
</div>


    </div>
    );
  };

  export default AdminsComponent;