import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import Navbar from "./Navbar";
import Cookies from "js-cookie";
import userimg from "../images/user.png";
import axios from "axios";

export default function Notifications() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("interest");
  const [confirmAction, setConfirmAction] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [approvedIds, setApprovedIds] = useState([]);
  const [isActivated, setIsActivated] = useState(false);
  const [avatarMap, setAvatarMap] = useState({});
  const [showActivationModal, setShowActivationModal] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const api = "https://api.halalmatchmakings.com";

  function getUserIdFromCookie() {
    const name = "user=";
    const decodedCookies = decodeURIComponent(document.cookie);
    const cookies = decodedCookies.split(';');

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith(name)) {
        try {
          const userJson = cookie.substring(name.length);
          const user = JSON.parse(userJson);
          return user.id;
        } catch (error) {
          console.error("Failed to parse user cookie:", error);
          return null;
        }
      }
    }

    toast.warn("User cookie not found. login again");
    return null;
  }

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${api}/getAllNotifications`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        if (data && Array.isArray(data.notifications)) {
          setNotifications(data.notifications);
          const unread = data.notifications.filter(n => !n.isRead).length;
          setUnreadCount(unread);
        } else {
          toast.error("try again later, relogin");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        toast.error("Failed to fetch notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const markAsRead = async (notificationId) => {
    try {
      const res = await fetch(`${api}/notifications/markAsRead/${notificationId}`, {
        method: 'PUT',
        credentials: 'include',
      });

      if (res.ok) {
        setNotifications((prev) =>
          prev.map((n) =>
            n._id === notificationId ? { ...n, isRead: true } : n
          )
        );
        setUnreadCount((prev) => Math.max(prev - 1, 0));
      }
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  const handleReply = async (notificationId, action) => {
    try {
      const res = await fetch(`${api}/updateNotificationStatus/${notificationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(data.message);

        setNotifications((prev) =>
          prev.map((n) =>
            n._id === notificationId ? { ...n, status: action, isRead: true } : n
          )
        );
        setUnreadCount((prev) => Math.max(prev - 1, 0));
        setConfirmAction(null);

        if (action === 'accepted') {
          if (data.notification?.type === 'image') return;

          if (data.notification?.type === 'interest') {
            await fetch(`${api}/matches/auto-create`, {
              method: 'POST',
              credentials: 'include',
            });
          }
        }
      } else {
        toast.error(data.message || 'Failed to update notification status');
      }
    } catch (err) {
      console.error('Error updating notification status:', err);
      toast.error('Error updating notification status');
    }
  };

  const handleViewDetails = async (userId, notifId) => {
    try {
      const res = await fetch(`${api}/user/${userId}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        res.status === 401
          ? toast.error("Unauthorized. Please log in again.")
          : toast.error("Failed to fetch user details");
        return;
      }

      const data = await res.json();
      fetchSingleAvatar(data?.data?._id);
      setSelectedUser(data);
      setShowModal(true);

      await markAsRead(notifId);
    } catch (err) {
      console.error("Error fetching user:", err);
      toast.error("Something went wrong");
    }
  };

  const filteredNotifications = notifications.filter((n) => n.type === activeTab);

  const isLoggedInUserRecipient = (notification) => {
    const loggedInUserId = getUserIdFromCookie();
    return loggedInUserId && notification.recipient === loggedInUserId;
  };

  const checkActivation = async () => {
    try {
      const userCookie = Cookies.get("user");
      if (!userCookie) return false;
      const user = JSON.parse(decodeURIComponent(userCookie));

      const res = await fetch(`${api}/checkactivation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: user.email }),
      });

      const data = await res.json();
      setIsActivated(data.activated);
      setShowActivationModal(!data.activated);
      return data.activated;
    } catch {
      toast.error("Failed to check activation.");
      setIsActivated(false);
      return false;
    }
  };

  useEffect(() => {
    checkActivation();
  }, []);

  const fetchSingleAvatar = async (userId) => {
    if (!userId) return;
    try {
      const res = await axios.post(
        `${api}/users/avatars`,
        { userIds: [userId] },
        { withCredentials: true }
      );
      if (res.data.avatars && res.data.avatars[userId]) {
        setAvatarMap(prev => ({ ...prev, [userId]: res.data.avatars[userId] }));
      }
    } catch (err) {
      console.error("Failed to fetch avatar", err);
    }
  };

  const includedFields = [
    "age", "gender", "location", "maritalStatus",
    "hobbies", "profession", "religiousLevel", "qualification", "genotype",
    "ethnicity", "height", "weight", "complexion", "bio", "dealBreakers",
    "spouseQualities", "physicalChallenges", "stateOfOrigin", "marriageIntentDuration"
  ];

  return (
    <div>
      <Navbar unreadCount={unreadCount} />
      <Toaster />
       <div className="w-[99vw] max-w-full min-h-screen overflow-x-hidden">
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Toaster position="top-center" reverseOrder={false} />
          <main className="flex-1 flex justify-center items-start p-6 w-full">
            <div className="w-full max-w-[600px]">
              <h1 className="text-3xl font-bold mb-8 text-center">Notifications</h1>

              <div className="flex justify-center mb-8 gap-2">
                {["interest", "image"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 text-sm rounded-full font-semibold transition-all shadow-sm ${activeTab === tab ? "bg-blue-600 text-white" : "bg-white text-gray-600 border hover:bg-blue-50"}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} Requests
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-300 border-t-blue-600"></div>
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="text-center mt-16 text-gray-500">
                  No {activeTab} notifications yet.
                </div>
              ) : (
                <div className="p-4">
                  {filteredNotifications.map((n) => (
                    <div key={n._id} className="bg-white shadow p-4 rounded mb-4">
                      <p><strong>From:</strong> {n.senderName || "Unknown"}</p>
                      <p><strong>Type:</strong> {n.type}</p>
                      <p><strong>Date:</strong> {formatDate(n.createdAt)}</p>
                      <div className="flex gap-3 mt-3 items-center">
                        <button onClick={() => handleViewDetails(n.sender, n._id)} className="text-blue-600 hover:underline">View Details</button>
                        {isLoggedInUserRecipient(n) && !n.status && (
                          <>
                            <button onClick={() => setConfirmAction({ id: n._id, action: 'accepted' })} className="text-green-600 hover:underline">Accept</button>
                            <button onClick={() => setConfirmAction({ id: n._id, action: 'rejected' })} className="text-red-600 hover:underline">Reject</button>
                          </>
                        )}
                        {!n.isRead && <span className="ml-2 w-2 h-2 bg-red-500 rounded-full"></span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>

          {/* User Details Modal */}
          {showModal && selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg w-full max-w-lg p-6 relative overflow-y-auto max-h-[90vh]">
                <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">✖</button>
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={avatarMap[selectedUser.data._id] || userimg}
                    alt="User Avatar"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-bold">{selectedUser.data.nickname}</h2>
                    <p className="text-sm text-gray-500">Age: {selectedUser.data.age}</p>
                    <p className="text-sm text-gray-500">Location: {selectedUser.data.location}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                  {Object.entries(selectedUser.data)
                    .filter(([key]) => includedFields.includes(key))
                    .map(([key, value]) => (
                      <div key={key} className="capitalize">
                        <strong>{key.replace(/([A-Z])/g, ' $1')}: </strong>
                        {Array.isArray(value) ? value.join(", ") : String(value)}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
          {/* Confirmation Modal */}
          {confirmAction && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                <p className="mb-4">Are you sure you want to {confirmAction.action} this request?</p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => handleReply(confirmAction.id, confirmAction.action)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setConfirmAction(null)}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Activation Modal */}
          {showActivationModal && (
            <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Account Activation Required</h2>
                <p className="text-sm text-gray-700 mb-4">Please activate your account to access full features.</p>
                <button
                  onClick={() => setShowActivationModal(false)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
