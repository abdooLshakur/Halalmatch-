import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MatchesComponent = () => {
    const [matches, setMatches] = useState([]);
    // const API = "https://api.zmhcollections.online";
    const API= "http://localhost:8900"
    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const { data } = await axios.get(`${API}/matches`, {
                    withCredentials: true
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
        const res = await axios.post(`${API}/matches/${matchId}/share-contact`, {}, {
          withCredentials: true
        });
    
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
    
    

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col flex-grow space-y-4 p-4 w-full overflow-x-auto">
            <ToastContainer />
                <h3 className="text-lg font-semibold">Matched Users</h3>
                <div className="w-[80vw] max-w-full py-6 bg-white min-h-screen overflow-x-hidden m-[0 auto]">
                <table className="min-w-full sm:min-w-[800px] w-full border text-sm rounded-md shadow-md">
                <thead className="bg-indigo-500 text-white">
                        <tr>
                            <th className="p-2 border">User A</th>
                            <th className="p-2 border">User B</th>
                            <th className="p-2 border">Matched On</th>
                            <th className="p-2 border text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map((match) => (
                            <tr key={match._id} className="hover:bg-gray-50">
                                <td className="p-2 border">
                                    <strong>{match.user1.name}</strong>
                                    <br />
                                    <span className="text-xs text-gray-500">{match.user1.email}</span>
                                </td>
                                <td className="p-2 border">
                                    <strong>{match.user2.name}</strong>
                                    <br />
                                    <span className="text-xs text-gray-500">{match.user2.email}</span>
                                </td>
                                <td className="p-2 border">{new Date(match.createdAt).toLocaleString()}</td>
                                <td className="p-2 border text-center">
                                    <button
                                        onClick={() => handleShareContact(match._id)}
                                        className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 w-full md:w-auto"
                                    >
                                        Share Contact Info
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

