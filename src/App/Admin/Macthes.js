import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const MatchesComponent = () => {
    const [matches, setMatches] = useState([]);
    const API = "https://api.zmhcollections.online";
    useEffect(() => {
        const fetchMatches = async () => {
            const { data } = await axios.get(`${API}/matches`);
            setMatches(data);
        };
        fetchMatches();
    }, []);

    const handleShareContact = async (matchId) => {
        await axios.post(`${API}/matches/${matchId}/share-contact`);
    };

    return (
        <div>
            <Sidebar/>
            <div className="w-[99vw] h-screen flex items-center justify-center bg-gray-100">

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Matched Users</h3>
                    <table className="min-w-full border text-sm rounded-md shadow-md">
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

