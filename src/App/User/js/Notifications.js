import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import Navbar from "./Navbar";
import Cookies from "js-cookie";
import userimg from "../images/user.png";
import axios from "axios";

export default function Notifications() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]); // Initialized to an empty array
  const [activeTab, setActiveTab] = useState("interest");
  const [confirmAction, setConfirmAction] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [approvedIds, setApprovedIds] = useState([]);
  const [isActivated, setIsActivated] = useState(false);
  const [avatarMap, setAvatarMap] = useState({});
  const [showActivationModal, setShowActivationModal] = useState(false);

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
          setNotifications(data.notifications); // Correctly setting notifications state
        } else {
          toast.error("try again later");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        toast.error("Failed to fetch notifications.");
      } finally {
        setLoading(false);
      }
    };

    // Fetch notifications on component mount
    fetchNotifications();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleReply = async (notificationId, action) => {
    try {
      const res = await fetch(`${api}/updateNotificationStatus/${notificationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ action }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(data.message);

        // Update the notification locally
        setNotifications((prev) =>
          prev.map((n) =>
            n._id === notificationId
              ? { ...n, status: action, isRead: true }
              : n
          )
        );
        setConfirmAction(null);

        // Additional handling based on type
        if (action === 'accepted') {
          // If this was an image request, and backend returns info about sender
          if (data.notification?.type === 'image' && data.notification?.sender) {
            // Optional: update access list (if using context or state-sharing)
            // e.g. approvedIds.push(data.notification.sender)
            // Optionally: update global state or call refresh
          }
          if (action === 'accepted') {
            if (data.notification?.type === 'image') {
              // no match creation
              return;
            }

            // Only run for interest-type
            if (data.notification?.type === 'interest') {
              await fetch(`${api}/matches/auto-create`, {
                method: 'POST',
                credentials: 'include',
              });
            }
          }

          // Still allow auto-match creation (for interest-type)
          await fetch(`${api}/matches/auto-create`, {
            method: 'POST',
            credentials: 'include',
          });
        }

      } else {
        toast.error(data.message || 'Failed to update notification status');
      }
    } catch (err) {
      console.error('Error updating notification status:', err);
      toast.error('Error updating notification status');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, { method: "DELETE" });

      if (!response.ok) throw new Error("Failed to delete");

      setNotifications((prev) => prev.filter((n) => n._id !== id));
      toast.success("Notification deleted successfully.");
    } catch (error) {
      toast.error("Error deleting notification:", error);
      toast.error("Failed to delete notification.");
    } finally {
      setConfirmAction(null);
    }
  };

  const filteredNotifications = Array.isArray(notifications)
    ? notifications.filter((n) => n.type === activeTab)
    : [];

  const isLoggedInUserRecipient = (notifications) => {
    const loggedInUserId = getUserIdFromCookie();
    return loggedInUserId && notifications.recipient === loggedInUserId;
  };

  const handleViewDetails = async (userId) => {
    try {
      const res = await fetch(`${api}/user/${userId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          toast.error("Unauthorized. Please log in again.");
        } else {
          toast.error("Failed to fetch user details");
        }
        return;
      }

      const data = await res.json();


      setSelectedUser(data);
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching user:", err);
      toast.error("Something went wrong");
    }
  };



  const checkActivation = async () => {
    try {
      const userCookie = Cookies.get("user");
      if (!userCookie) {
        toast.error("You are not logged in.");
        return false;
      }

      const user = JSON.parse(decodeURIComponent(userCookie));

      const res = await fetch(`${api}/checkactivation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: user.email }),
      });

      if (!res.ok) {
        const errText = await res.text();
        toast.error("Server error: " + errText);
        return false;
      }

      const data = await res.json();

      if (data.activated === true) {
        setShowActivationModal(false);
        setIsActivated(true); // ✅ <-- Added
        return true;
      } else {
        setShowActivationModal(true);
        setIsActivated(false); // ✅ <-- Added
        return false;
      }
    } catch (err) {
      toast.error("Failed to check activation.");
      setIsActivated(false);
      return false;
    }
  };

  useEffect(() => {
    checkActivation();
  }, []);

  const fetchSingleAvatar = async (userId) => {
    if (!userId) {
      console.warn("No userId provided to fetchSingleAvatar");
      return;
    }

    console.log("Fetching avatar for user:", userId);
    try {
      const res = await axios.post(
        `${api}/users/avatars`,
        { userIds: [userId] },
        { withCredentials: true }
      );
      if (res.data.avatars && res.data.avatars[userId]) {
        setAvatarMap(prev => ({
          ...prev,
          [userId]: res.data.avatars[userId]
        }));
      } else {
        console.warn("No avatar returned for user:", userId);
      }
    } catch (err) {
      console.error("Failed to fetch avatar for user", err);
    }
  };

  useEffect(() => {
    if (selectedUser?.data && !avatarMap[selectedUser.data._id]) {
      fetchSingleAvatar(selectedUser.data._id);
    }
  }, [selectedUser]);


  return (
    <div>
      <Navbar />
      <div className="w-[99vw] max-w-full min-h-screen overflow-x-hidden">
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Toaster position="top-center" reverseOrder={false} />
          <main className="flex-1 flex justify-center items-start p-6 w-full">
            <div className="w-full max-w-[600px]">

              {/* Page Title */}
              <h1 className="text-3xl font-bold mb-8 text-center">Notifications</h1>

              {/* Tabs */}
              <div className="flex justify-center mb-8 gap-2">
                {["interest", "image"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 text-sm rounded-full font-semibold transition ${activeTab === tab
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 border hover:bg-gray-50"
                      }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} Requests
                  </button>
                ))}
              </div>

              {/* Content */}
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-300 border-t-blue-600"></div>
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="text-center mt-16 text-gray-500">
                  No {activeTab} notifications yet.
                </div>
              ) : (

                <div className="space-y-6">
                  {filteredNotifications.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-semibold capitalize">
                          {item.type || "Notification"}
                        </h2>
                        <span className="text-xs text-gray-400">
                          {formatDate(item.createdAt)}
                        </span>
                      </div>

                      {/* ✅ Sender Name */}
                      <p className="text-sm text-gray-700 mt-2 mb-1">
                        From:{" "}
                        <span className="font-semibold">
                          {item.sender ? `${item.sender.first_name} ${item.sender.last_name}` : "Unknown Sender"}
                        </span>
                      </p>

                      <p className="text-sm text-gray-700 mb-4">
                        {item.message || "You have a new notification."}
                      </p>

                      {item.type === "image" && item.status === "accepted" && item.sender?._id && (
                        <button
                          onClick={() => handleViewDetails(item.sender._id)}
                          className="text-sm text-blue-600 underline mb-4"
                        >
                          👁️ View Sender Details
                        </button>
                      )}

                      {/* Actions */}
                      {isLoggedInUserRecipient(item) ? (
                        <>
                          {item.status === "pending" && (
                            <>
                              {isActivated ? (
                                <div className="flex flex-wrap gap-4 mt-4">
                                  <button
                                    onClick={() =>
                                      setConfirmAction({ type: "accepted", id: item._id })
                                    }
                                    className="flex-1 min-w-[100px] px-4 py-2 border border-green-600 text-green-700 hover:bg-green-50 text-sm font-medium rounded-xl transition"
                                  >
                                    ✅ Accept
                                  </button>
                                  <button
                                    onClick={() =>
                                      setConfirmAction({ type: "rejected", id: item._id })
                                    }
                                    className="flex-1 min-w-[100px] px-4 py-2 border border-yellow-500 text-yellow-600 hover:bg-yellow-50 text-sm font-medium rounded-xl transition"
                                  >
                                    ❌ Reject
                                  </button>
                                </div>
                              ) : (
                                <div className="mt-4 text-sm text-red-600 font-medium">
                                  To accept/reject this interest, please{" "}
                                  <button
                                    className="underline text-blue-600"
                                    onClick={() => setShowActivationModal(true)}
                                  >
                                    verify your account
                                  </button>
                                  .
                                </div>
                              )}
                            </>
                          )}
                          <div className="mt-3 text-sm text-gray-600 font-medium">
                            Status: <span className="capitalize">{item.status || "Pending"}</span>
                          </div>
                        </>
                      ) : (
                        <div className="mt-3 text-sm text-gray-600 font-medium">
                          Status: <span className="capitalize">{item.status || "Pending"}</span>
                        </div>
                      )}

                    </div>
                  ))}

                </div>
              )}
              {selectedUser && (
                <div>
                  <p>User: {selectedUser.first_name} {selectedUser.last_name}</p>
                  <p>Avatar Map: {JSON.stringify(avatarMap[selectedUser._id])}</p>
                </div>
              )}

              {/* Confirmation Modal */}
              {confirmAction && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                  <div className="bg-white p-8 rounded-lg shadow-lg max-w-[400px] w-full">
                    <h3 className="text-lg font-bold mb-4 text-center">
                      {confirmAction.type === "delete"
                        ? "Delete Notification"
                        : `${confirmAction.type.charAt(0).toUpperCase() + confirmAction.type.slice(1)} Request`}
                    </h3>

                    {/* ✅ Conditional message */}
                    <p className="text-sm text-gray-600 mb-6 text-center leading-relaxed">
                      {confirmAction.type === "accepted" && activeTab === "interest" ? (
                        <>
                          Are you sure you want to accept this interest request?
                          <br />
                          Accepting will allow your contact information to be shared with the sender for easier communication.
                        </>
                      ) : (
                        <>Are you sure you want to {confirmAction.type} this?</>
                      )}
                    </p>

                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => {
                          if (confirmAction.type === "delete") {
                            handleDelete(confirmAction.id);
                          } else {
                            handleReply(confirmAction.id, confirmAction.type);
                          }
                        }}
                        className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setConfirmAction(null)}
                        className="px-5 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {showModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-xl max-w-lg w-full animate-slide-in-up">
                    <h2 className="text-xl font-semibold mb-4">
                      {selectedUser.first_name} {selectedUser.last_name}
                    </h2>
                    {(() => {
                      const hasImageAccess =
                        selectedUser.avatar && approvedIds.includes(selectedUser._id);
                      return (
                        <img
                          src={
                            avatarMap[selectedUser.data._id]
                              ? `${avatarMap[selectedUser.data._id]}`
                              : userimg // fallback image
                          }
                          alt={`${selectedUser.data.first_name} ${selectedUser.data.last_name}`}
                          className={`w-full h-48 object-cover rounded-xl mb-4 ${avatarMap[selectedUser.data._id] ? "" : "opacity-50"
                            }`}
                        />
                      );
                    })()}

                    {[
                      "age",
                      "location",
                      "ethnicity",
                      "height",
                      "weight",
                      "maritalStatus",
                      "qualification",
                      "profession",
                      "religiousLevel",
                      "spouseQualities",
                      "gender",
                      "dealBreakers",
                      "physicalChallenges",
                      "complexion",
                      "stateOfOrigin",
                      "numberOfKids"
                    ].map((key) => (
                      <p key={key}>
                        <strong>
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                          :
                        </strong>{" "}
                        {selectedUser?.data?.[key] || "N/A"}
                      </p>
                    ))}

                    <div className="text-right mt-4">
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 border rounded"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
