import { useEffect, useState, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaFilter } from "react-icons/fa";
import Navbar from "./Navbar";
import debounce from "lodash/debounce";
import userimg from "../images/user.png"
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
};

export default function ProfileListingPage() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ location: "", ethnicity: "", minAge: 18, maxAge: 60 });
  const [sortOption, setSortOption] = useState("ageAsc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [interestMessage, setInterestMessage] = useState("");
  const [targetUserId, setTargetUserId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestedAccessIds, setRequestedAccessIds] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [approvedIds, setApprovedIds] = useState([]);

  const api = "https://api.zmhcollections.online";

  const getUserIdFromCookie = () => {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('user='));
    if (!cookie) return null;

    try {
      const userData = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
      return userData.id;
    } catch (err) {
      console.error('Failed to parse user cookie:', err);
      return null;
    }
  };

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${api}/users?location=${filters.location}&ethnicity=${filters.ethnicity}`,
        { credentials: "include" }
      );
      const data = await res.json();
      const rawUsers = data.data;

      const loggedInUserId = getUserIdFromCookie();

      const filteredByAge = rawUsers.filter(user =>
        user.age >= filters.minAge && user.age <= filters.maxAge
      );

      const filteredUsers = filteredByAge.filter(user => user._id !== loggedInUserId);

      const pageSize = 9;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedUsers = filteredUsers.slice(start, end);

      setUsers(paginatedUsers);
      setTotalPages(Math.ceil(filteredUsers.length / pageSize));
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);




  const debouncedFetchUsers = useCallback(debounce(fetchUsers, 500), [fetchUsers]);

  useEffect(() => {
    debouncedFetchUsers();
  }, [debouncedFetchUsers]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: name.includes("age") ? Math.max(18, Number(value)) : value,
    }));
  };

  const clearFilters = () => {
    setFilters({ location: "", ethnicity: "", minAge: 18, maxAge: 60 });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const openInterestModal = (receiverId) => {
    setTargetUserId(receiverId);
    setShowInterestModal(true);
  };

  const openDetailsModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const submitInterest = async () => {
    if (!interestMessage.trim()) {
      toast.error("Please write a message before sending.");
      return;
    }
    if (!targetUserId) {
      toast.error("No recipient selected.");
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await fetch(`${api}/createnotifiation/${targetUserId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message: interestMessage, type: "interest" }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to send interest");
      toast.success("Interest expressed successfully!");
      setShowInterestModal(false);
      setInterestMessage("");
      setTargetUserId(null);
    } catch (err) {
      toast.error(err.message || "Error expressing interest.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const requestImageAccess = async (targetUserId) => {
    try {
      const res = await fetch(`${api}/createnotifiation/${targetUserId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ type: "image" }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to request image access");
      toast.success("Image access requested!");
      setRequestedAccessIds((prev) => [...prev, targetUserId]);
    } catch (err) {
      toast.error(err.message || "Error requesting image access.");
    }
  };
  useEffect(() => {
    const fetchApprovedIds = async () => {
      try {
        const res = await fetch(`${api}/approvedimagerequests`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        setApprovedIds(data.approved.map(id => String(id)));
      } catch (error) {
        console.error("Failed to fetch approved image requests:", error);
      }
    };

    const userId = getUserIdFromCookie();
    if (userId) {
      fetchApprovedIds();
    }
  }, []);



  const renderUserDetail = (label, value) => (
    <p><strong>{label}:</strong> {value || 'N/A'}</p>
  );

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="w-[99vw] max-w-full py-6 bg-white min-h-screen overflow-x-hidden">

        <div className="flex flex-col lg:flex-row min-h-screen">
          <aside className={`bg-white p-6 shadow-md lg:w-72 w-full ${showSidebar ? 'block' : 'hidden'} lg:block`}>
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Min Age</label>
                <input type="number" name="minAge" min="18" max="60" value={filters.minAge} onChange={handleFilterChange} className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium">Max Age</label>
                <input type="number" name="maxAge" min="18" max="60" value={filters.maxAge} onChange={handleFilterChange} className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium">Location</label>
                <input type="text" name="location" value={filters.location} onChange={handleFilterChange} className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium">Ethnicity</label>
                <select name="ethnicity" value={filters.ethnicity} onChange={handleFilterChange} className="w-full border p-2 rounded">
                  <option value="">Any</option>
                  <option value="Asian">Asian</option>
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                  <option value="Hispanic">Hispanic</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button type="button" onClick={clearFilters} className="text-sm text-blue-600 underline">Clear Filters</button>
            </form>
          </aside>

          <main className="flex-1 p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold">Browse Profiles</h1>
              <div className="flex items-center gap-4">
                <button onClick={() => setShowSidebar(!showSidebar)} className="lg:hidden bg-blue-600 text-white px-3 py-2 rounded">
                  <FaFilter />
                </button>
                <label className="text-sm font-medium mr-2">Sort by:</label>
                <select value={sortOption} onChange={handleSortChange} className="border p-2 rounded">
                  <option value="ageAsc">Age (Asc)</option>
                  <option value="ageDesc">Age (Desc)</option>
                  <option value="locationAsc">Location (A-Z)</option>
                  <option value="locationDesc">Location (Z-A)</option>
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            <div className="mb-4 flex flex-wrap gap-2">
              {Object.entries(filters).map(([key, val]) => val && (
                <span key={key} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{key}: {val}</span>
              ))}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-gray-200 h-60 rounded-xl" />
                ))}
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-2">{users.length} profiles found</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {users.length === 0 && <p>No users found.</p>}
                  {users.map((user) => {
                    const isApproved = approvedIds.includes(String(user._id));

                    return (
                      <div key={user._id} className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition">
                        <img
                          src={
                            isApproved && user.avatar !== null
                              ? `${api}/${user.avatar}`
                              : {userimg} // fallback icon in your public folder
                          }
                          alt={`${user.first_name} ${user.last_name}'s avatar`}
                          className={`w-full h-48 object-cover rounded-xl mb-4 ${!isApproved ? "opacity-50" : ""}`}
                        />

                        <h3 className="text-lg font-bold">{user.first_name} {user.last_name}</h3>
                        <p className="text-sm text-gray-500">Age: {user.age} • {user.location}</p>
                        <p className="text-sm text-gray-500">Ethnicity: {user.ethnicity}</p>
                        <p className="text-sm text-gray-500">Height: {user.height}cm • Weight: {user.weight}kg</p>
                        <div className="flex flex-col gap-2 mt-3">
                          <button onClick={() => openInterestModal(user._id)} className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition">Express Interest</button>
                          <button onClick={() => openDetailsModal(user)} className="bg-gray-200 text-gray-800 p-2 rounded hover:bg-gray-300 transition">View More</button>
                          <button
                            onClick={() => requestImageAccess(user._id)}
                            disabled={requestedAccessIds.includes(user._id)}
                            className={`p-2 rounded ${requestedAccessIds.includes(user._id) ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700 transition"}`}
                          >
                            {requestedAccessIds.includes(user._id) ? "Requested" : "Request Image Access"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            <div className="flex justify-between items-center mt-8">
              <button disabled={page === 1 || loading} onClick={() => setPage((prev) => Math.max(1, prev - 1))} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">Previous</button>
              <span>Page {page} of {totalPages}</span>
              <button disabled={page === totalPages || loading} onClick={() => setPage((prev) => prev + 1)} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">Next</button>
            </div>
          </main>
        </div>

        {/* Interest Modal */}
        {showInterestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">Express Interest</h2>
              <textarea
                value={interestMessage}
                onChange={(e) => setInterestMessage(e.target.value)}
                rows={4}
                className="w-full border rounded p-2 mb-4"
                placeholder="Write a message..."
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowInterestModal(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button onClick={submitInterest} disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {showModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl max-w-lg w-full">
              <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
              <img src={selectedUser.avatar || "/placeholder.jpg"} alt="Avatar" className="w-full h-60 object-cover rounded-xl mb-4" />
              {renderUserDetail("Name", `${selectedUser.first_name} ${selectedUser.last_name}`)}
              {renderUserDetail("Age", selectedUser.age)}
              {renderUserDetail("Location", selectedUser.location)}
              {renderUserDetail("Ethnicity", selectedUser.ethnicity)}
              {renderUserDetail("Height", `${selectedUser.height} cm`)}
              {renderUserDetail("Weight", `${selectedUser.weight} kg`)}
              <div className="flex justify-end mt-4">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
