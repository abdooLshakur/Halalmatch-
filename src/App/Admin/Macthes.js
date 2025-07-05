import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MatchesComponent = () => {
  const [matches, setMatches] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const API = "https://api.halalmatchmakings.com";

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${API}/matches`, {
          withCredentials: true,
        });
        setMatches(data.matches || []);
      } catch (err) {
        console.error("Error fetching matches:", err);
        toast.error("Failed to fetch matches.");
      } finally {
        setIsLoading(false);
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
    const user1First = match?.user1?.first_name?.toLowerCase() || "";
    const user1Last = match?.user1?.last_name?.toLowerCase() || "";
    const user2First = match?.user2?.first_name?.toLowerCase() || "";
    const user2Last = match?.user2?.last_name?.toLowerCase() || "";

    const user1Full = user1First + user1Last;
    const user2Full = user2First + user2Last;

    return (
      user1First.includes(search.toLowerCase()) ||
      user1Last.includes(search.toLowerCase()) ||
      user2First.includes(search.toLowerCase()) ||
      user2Last.includes(search.toLowerCase())
    );

  });


  return (
    <div className="min-w-[99vw] flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Sidebar />
      <ToastContainer />
      <div className="min-w-[100vw] lg:min-w-[80vw] p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Matched Users</h3>
          <input
            type="text"
            placeholder="Search matches..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-4 md:mt-0 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full md:w-1/3"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500 border-opacity-70"></div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md bg-white">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-indigo-600 text-white uppercase">
                <tr>
                  <th className="px-4 py-3">User A</th>
                  <th className="px-4 py-3">User B</th>
                  <th className="px-4 py-3 hidden md:table-cell">Matched On</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMatches.map((match) => (
                  <tr key={match._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-700">
                        {match.user1
                          ? `${match.user1.first_name} ${match.user1.last_name}`
                          : "N/A"}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {match.user1?.phone || match.user1?.email || "N/A"}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-700">
                        {match.user2
                          ? `${match.user2.first_name} ${match.user2.last_name}`
                          : "N/A"}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {match.user2?.phone || match.user2?.email || "N/A"}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-xs text-gray-600">
                      {match.createdAt
                        ? new Date(match.createdAt).toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleShareContact(match._id)}
                        className="bg-indigo-500 text-white px-4 py-1.5 rounded-md text-xs hover:bg-indigo-600 transition"
                      >
                        Share Contact
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredMatches.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No matches found.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesComponent;
