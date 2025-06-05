import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MatchesComponent = () => {
  const [matches, setMatches] = useState([]);
  const [search, setSearch] = useState("");
  const API = "https://api.halalmatchmakings.com";

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const { data } = await axios.get(`${API}/matches`, {
          withCredentials: true,
        });
        setMatches(data.matches);
      } catch (err) {
        console.error("Error fetching matches:", err);
      }
    };
    fetchMatches();
  }, []);

  const handleShareContact = async (matchId) => {
    try {
      const res = await axios.post(
        `${API}/matches/${matchId}/share-contact`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Contact shared successfully!");
      } else {
        toast.error(res.data.message || "Unexpected response from server.");
      }
    } catch (err) {
      console.error("Error sharing contact:", err);
      toast.error(err.response?.data?.message || "Failed to share contact.");
    }
  };

  const filteredMatches = matches.filter((match) => {
    const user1 = match?.user1?.name?.toLowerCase() || "";
    const user2 = match?.user2?.name?.toLowerCase() || "";
    return (
      user1.includes(search.toLowerCase()) ||
      user2.includes(search.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
        <ToastContainer />
      <div className="w-full lg:w-[85vw] px-4 py-6 bg-white">
        <h3 className="text-lg font-semibold">Matched Users</h3>

        <input
          type="text"
          placeholder="Search matches..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm p-2 border rounded mb-4"
        />

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead className="bg-indigo-500 text-white">
                <tr>
                  <th className="p-2 sm:p-3 text-left">User A</th>
                  <th className="p-2 sm:p-3 text-left">User B</th>
                  <th className="p-2 sm:p-3 text-left hidden md:table-cell">
                    Matched On
                  </th>
                  <th className="p-2 sm:p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMatches.map((match) => (
                  <tr key={match._id} className="hover:bg-gray-50">
                    <td className="p-2 sm:p-3 border">
                      <div className="font-medium text-sm">
                        {match.user1.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {match.user1.email}
                      </div>
                    </td>
                    <td className="p-2 sm:p-3 border">
                      <div className="font-medium text-sm">
                        {match.user2.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {match.user2.email}
                      </div>
                    </td>
                    <td className="p-2 sm:p-3 border text-xs hidden md:table-cell">
                      {new Date(match.createdAt).toLocaleString()}
                    </td>
                    <td className="p-2 sm:p-3 border text-center">
                      <button
                        onClick={() => handleShareContact(match._id)}
                        className="bg-indigo-500 text-white px-3 py-1 text-xs rounded hover:bg-indigo-600"
                      >
                        Share Contact
                      </button>
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

export default MatchesComponent;
