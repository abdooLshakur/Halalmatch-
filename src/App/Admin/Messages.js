import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const ContactMessagesComponent = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API = "https://api.halalmatchmakings.com";

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${API}/messages`, {
          withCredentials: true,
        });
        setMessages(data || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Sidebar />
      <div className="w-full p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Contact Messages
        </h3>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500 border-opacity-70"></div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md bg-white">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-indigo-600 text-white uppercase">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Received At</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {msg.name || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {msg.email || "N/A"}
                    </td>
                    <td className="px-4 py-3">{msg.subject || "N/A"}</td>
                    <td className="px-4 py-3">{msg.message || "N/A"}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {msg.createdAt
                        ? new Date(msg.createdAt).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
                {messages.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No messages found.
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

export default ContactMessagesComponent;
