import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import Navbar from "./Navbar";

export default function Notifications() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]); // Initialized to an empty array
  const [activeTab, setActiveTab] = useState("interest");
  const [confirmAction, setConfirmAction] = useState(null);
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

                      {/* ✅ Message */}
                      <p className="text-sm text-gray-700 mb-4">
                        {item.message || "You have a new notification."}
                      </p>

                      {/* Actions */}
                      {isLoggedInUserRecipient(item) ? (
                        <>
                          {item.status === "pending" && (
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

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
