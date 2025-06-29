import React, { useState, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaFilter, FaChevronUp } from "react-icons/fa";
import Navbar from "./Navbar";
import debounce from "lodash/debounce";
import userimg from "../images/user.png";

const getUserIdFromCookie = () => {
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith("user="));
  if (!cookie) return null;
  try {
    const userData = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
    return userData.id;
  } catch {
    return null;
  }
};

export default function ProfileListingPage() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ location: "", ethnicity: "", gender: "", minAge: 18, maxAge: 60 });
  const [sortOption, setSortOption] = useState("");
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
  const [approvedIds, setApprovedIds] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showActivationModal, setShowActivationModal] = useState(false);

  const api = "https://api.halalmatchmakings.com";

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        location: filters.location,
        ethnicity: filters.ethnicity,
        gender: filters.gender
      });
      const res = await fetch(`${api}/users?${params}`, { credentials: "include" });
      const data = await res.json();
      const all = data.data.filter(u => u._id !== getUserIdFromCookie());
      const byAge = all.filter(u => u.age >= filters.minAge && u.age <= filters.maxAge);

      let sorted = [...byAge];
      if (sortOption === "ageAsc") sorted.sort((a, b) => a.age - b.age);
      if (sortOption === "ageDesc") sorted.sort((a, b) => b.age - a.age);

      const pageSize = 15;
      setTotalPages(Math.ceil(sorted.length / pageSize));
      setUsers(sorted.slice((page - 1) * pageSize, page * pageSize));
    } catch (e) {
      console.error(e);
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  }, [filters, sortOption, page]);

  const debouncedFetch = useCallback(debounce(fetchUsers, 300), [fetchUsers]);

  useEffect(() => {
    debouncedFetch();
    return debouncedFetch.cancel;
  }, [debouncedFetch]);

  const checkActivation = async () => {
    try {
      const res = await fetch(`${api}/checkactivation`, {
        method: 'GET',
        credentials: 'include',
      });

      if (res.status === 401) {
        toast.error("Your session has expired. Please log in again.");
        return false;
      }

      const data = await res.json();

      if (res.ok && data?.activated === true) {
        setShowActivationModal(false);
        return true;
      } else {
        setShowActivationModal(true);
        return false;
      }

    } catch (err) {
      toast.error("Unable to verify your activation status. Please try again later.");
      console.error("Activation check error:", err);
      return false;
    }
  };

  useEffect(() => {
    checkActivation();
  }, []);

  const openInterest = async (id) => {
    const isActivated = await checkActivation();
    if (!isActivated) {
      return;
    }
    setTargetUserId(id);
    setShowInterestModal(true);
  };


  const openDetails = user => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const submitInterest = async () => {
    if (!interestMessage.trim()) return toast.error("Please write something.");
    setIsSubmitting(true);
    try {
      const res = await fetch(`${api}/createnotifiation/${targetUserId}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: interestMessage, type: "interest" })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      toast.success("Interest sent!");
      setShowInterestModal(false);
      setInterestMessage("");
      setTargetUserId(null);
    } catch (e) {
      toast.error(e.message || "Failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const requestImageAccess = async id => {
    try {
      const res = await fetch(`${api}/createnotifiation/${id}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "image" }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      toast.success("Requested image access!");
      setRequestedAccessIds(prev => [...prev, id]);
    } catch (e) {
      toast.error(e.message);
    }
  };


  useEffect(() => {
    const fetchApproved = async () => {
      const res = await fetch(`${api}/approvedimagerequests`, { credentials: 'include' });
      const data = await res.json();
      if (data.success) setApprovedIds(data.approvedIds);
    };
    fetchApproved();
  }, []);

  return (
    <div>
      <Navbar />
      <ToastContainer />

      <div className="w-[99vw] max-w-full py-6 bg-white min-h-screen overflow-x-hidden">
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Sidebar Filters */}
          <aside className={`bg-white p-6 shadow-md lg:w-72 w-full transition-all duration-300 ${showSidebar ? "block" : "hidden"} lg:block animate-slide-in-left`}>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Filters</h2>

            <label className="block mb-2">Gender:</label>
            <div className="flex mb-4 space-x-2">
              {["", "Male", "Female"].map(g => (
                <button
                  key={g}
                  onClick={() => setFilters(f => ({ ...f, gender: g }))}
                  className={`px-3 py-1 rounded ${filters.gender === g ? "bg-red-100" : "bg-gray-100"} hover:bg-red-200`}
                >
                  {g === "" ? "All" : g}
                </button>
              ))}
            </div>

            {["location", "ethnicity", "minAge", "maxAge"].map(field => (
              <div key={field} className="mb-4">
                <label className="block text-sm font-medium capitalize">{field.replace(/([A-Z])/g, " $1")}:</label>
                {field.includes("Age") ? (
                  <input type="number"
                    name={field}
                    value={filters[field]}
                    min="18"
                    max="100"
                    onChange={e => setFilters(f => ({ ...f, [field]: Number(e.target.value) }))}
                    className="w-full border p-2 rounded" />
                ) : (
                  <input type="text"
                    name={field}
                    value={filters[field]}
                    onChange={e => setFilters(f => ({ ...f, [field]: e.target.value }))}
                    className="w-full border p-2 rounded" />
                )}
              </div>
            ))}

            <label className="block mb-2">Sort by Age:</label>
            <select
              value={sortOption}
              onChange={e => setSortOption(e.target.value)}
              className="w-full border p-2 mb-4 rounded"
            >
              <option value="">None</option>
              <option value="ageAsc">Low to High</option>
              <option value="ageDesc">High to Low</option>
            </select>

            <button
              onClick={() => {
                setFilters({ location: "", ethnicity: "", gender: "", minAge: 18, maxAge: 60 });
                setSortOption("");
                setPage(1);
              }}
              className="w-full bg-red-100 text-red-600 py-2 rounded"
            >
              Clear All
            </button>
          </aside>

          {/* Profiles */}
          <main className="flex-1 p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold animate-pulse">Browse Profiles</h1>
              <button
                onClick={() => setShowSidebar(s => !s)}
                className="lg:hidden bg-red-600 text-white px-3 py-2 rounded shadow"
              >
                <FaFilter />
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
                {Array(9).fill(0).map((_, i) => (
                  <div key={i} className="animate-pulse bg-gray-200 h-60 rounded-xl" />
                ))}
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-2">{users.length} profiles found</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
                  {users.length === 0 ? (
                    <p className="col-span-full text-center">No matches found.</p>
                  ) : users.map(user => {
                    const gotImage = user.avatar && approvedIds.includes(user._id);
                    return (
                      <div key={user._id} className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition animate-pop-in">
                        <img
                          src={gotImage ? `${api}/${user.avatar}` : userimg}
                          alt={`${user.first_name} ${user.last_name}`}
                          className={`w-full h-48 object-cover rounded-xl mb-4 ${gotImage ? "" : "opacity-50"}`}
                        />
                        <h3 className="text-lg font-bold mb-1">{user.first_name} {user.last_name}</h3>
                        <p className="text-sm text-gray-500">Age: {user.age} • {user.location}</p>
                        <p className="text-sm text-gray-500">Ethnicity: {user.ethnicity || "N/A"}</p>
                        <div className="flex flex-col gap-2 mt-3">
                          <button onClick={() => openInterest(user._id)} className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition">
                            Express Interest
                          </button>
                          <button onClick={() => openDetails(user)} className="bg-gray-100 text-gray-800 p-2 rounded hover:bg-gray-300 transition">
                            View More
                          </button>
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
              <button
                disabled={page === 1 || loading}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>Page {page} of {totalPages}</span>
              <button
                disabled={page === totalPages || loading}
                onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </main>
        </div>

        {/* Express Interest Modal */}
        {showInterestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl max-w-md w-full animate-slide-in-up">
              <h2 className="text-xl font-semibold mb-4">Express Interest</h2>
              <textarea
                className="w-full border rounded p-2 mb-4"
                rows="4"
                value={interestMessage}
                onChange={(e) => setInterestMessage(e.target.value)}
                placeholder="Write a message..."
              />
              <div className="flex justify-between">
                <button onClick={() => setShowInterestModal(false)} className="px-4 py-2 border rounded">
                  Cancel
                </button>
                <button onClick={submitInterest} disabled={isSubmitting} className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50">
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Activation Required Modal */}
        {showActivationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl max-w-md w-full animate-slide-in-up">
              <h2 className="text-xl font-semibold mb-4 text-red-600">
                Verification Required
              </h2>
              <p className="mb-4 text-gray-700">
                Your profile is not verified. To express interest, please activate your account.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowActivationModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowActivationModal(false);
                    window.location.href = "/activate";
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Activate Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Details Modal */}
        {showModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl max-w-lg w-full animate-slide-in-up">
              <h2 className="text-xl font-semibold mb-4">{selectedUser.first_name} {selectedUser.last_name}</h2>
              {(() => {
                const hasImageAccess = selectedUser.avatar && approvedIds.includes(selectedUser._id);
                return (
                  <img
                    src={hasImageAccess ? `${api}/${selectedUser.avatar}` : userimg}
                    alt="Avatar"
                    className={`w-full h-60 object-cover rounded-xl mb-4 ${hasImageAccess ? '' : 'opacity-50'}`}
                  />
                );
              })()}

              {["Age", "Location", "Ethnicity", "Height", "Weight", "maritalStatus", "qualification", "profession", "religiousLevel", "spouseQualities", "dealBreakers", "physicalChallenges", "complexion", "stateOfOrigin", "numberOfKids",].map(label => (
                <p key={label}><strong>{label}:</strong> {selectedUser[label.toLowerCase()] || "N/A"}</p>
              ))}
              <div className="text-right mt-4">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition"
      >
        <FaChevronUp />
      </button>
    </div>
  );
}
