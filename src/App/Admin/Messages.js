import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
const ContactMessagesComponent = () => {
    const [messages, setMessages] = useState([]);
    const API = "https://api.halalmacthmakings.com";
    useEffect(() => {
      const fetchMessages = async () => {
        const { data } = await axios.get(`${API}/messages`,
          {credentials: "include",} 
        );
        setMessages(data);
      };
      fetchMessages();
    }, []);
  
    return (
<div className="flex">
      <Sidebar/>
      <div className="space-y-4 p-4 w-full">
        <h3 className="text-lg font-semibold">Contact Messages</h3>
        <table className="min-w-full border text-sm rounded-md shadow-md">
          <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Received At</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id} className="hover:bg-gray-50">
                <td className="p-2 border font-medium">{msg.name}</td>
                <td className="p-2 border">{msg.email}</td>
                <td className="p-2 border">{msg.subject}</td>
                <td className="p-2 border">{msg.message}</td>
                <td className="p-2 border">{new Date(msg.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
  };

  export default ContactMessagesComponent;