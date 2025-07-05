import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
import { Phone } from "lucide-react";

export default function UserProfile() {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [userId, setUserId] = useState(null);
  const api = "https://api.halalmatchmakings.com";
  const navigate = useNavigate();

  const getCookie = (name) => {
    const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return m ? decodeURIComponent(m[2]) : null;
  };

  const selectFields = {
    genotype: ["AA", "AS", "SS"],
    bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    complexion: ["Fair", "Light Brown", "Dark", "Albino"],
    maritalStatus: ["Single", "Married", "Divorcee", "Widowed"],
    qualification: ["High School", "Diploma", "Bachelor's", "Master's", "PhD"],
    religiousLevel: ["Basically", "Averagely", "Devoted", "Scholar"],
    height: ["smallish", "medium", "Tall"],
    weight: ["XS", "S", "M", "L", "XL", "XXL",],
    gender: ["Male", "Female"],
  };

  useEffect(() => {
    const cookie = getCookie("user");
    if (!cookie) return navigate("/login");
    const parsed = JSON.parse(cookie);
    setUserId(parsed.id);
    fetchUserData(parsed.id);
  }, []);

  async function fetchUserData(id) {
    try {
      const res = await fetch(`${api}/user/${id}`, { credentials: "include" });

      if (res.status === 401) {
        toast.error("Session expired. Please log in again.");
        navigate("/login");
        return;
      }

      const result = await res.json();
      if (result.success) {
        setUserData(result.data);
      } else {
        toast.error("Failed to load user data");
      }
    } catch {
      toast.error("Error loading user data");
    }
  }


  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  async function handleUpload() {
    if (!selectedImage) return;
    const fd = new FormData();
    fd.append("avatar", selectedImage);
    try {
      const res = await fetch(`${api}/update-user/${userId}`, {
        method: "PUT",
        credentials: "include",
        body: fd,
      });
      const result = await res.json();
      if (result.success) {
        fetchUserData(userId);
        toast.success("Profile picture updated!");
        setSelectedImage(null);
        setPreviewUrl(null);
      } else toast.error("Upload failed.");
    } catch {
      toast.error("Upload failed.");
    }
  }

  function handleInputChange(e) {
    setUserData((u) => ({ ...u, [e.target.name]: e.target.value }));
  }

  async function handleSave() {
    const required = ["location", "ethnicity", "height", "weight", "genotype", "bloodGroup", "complexion", "qualification", "religiousLevel", "phone", "bio", "nickname"];
    for (const k of required) {
      if (!userData[k]) {
        toast.error(`Please fill the ${k} field`);
        return;
      }
    }
    try {
      const res = await fetch(`${api}/update-user/${userId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const result = await res.json();
      if (result.success) {
        fetchUserData(userId);
        setIsEditing(false);
        toast.success("Profile updated");
      } else toast.error("Failed to update profile");
    } catch {
      toast.error("Something went wrong while saving");
    }
  }

  function handleLogout() {
    Cookies.remove("token", { path: "/" });
    Cookies.remove("user", { path: "/" });
    navigate("/login");
  }

  return (
    <div className="min-h-screen w-screen bg-gray-50 flex flex-col">
      <Navbar />
      <ToastContainer position="top-right" autoClose={2000} />

      <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6 relative">

          {/* ✅ Badge top-left of the card */}
          {userData?.isVerified && (
            <div className="absolute top-4 left-4 bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded shadow">
              ✅ Account Activated
            </div>
          )}
          {!userData?.isVerified && (
            <div className="absolute top-4 left-4 bg-yellow-100 text-yellow-900 text-sm font-semibold px-3 py-1 rounded shadow">
              <Link to={"/activate"}>🔒 Account Not Activated</Link>
            </div>
          )}

          {/* Avatar & Edit */}
          <div className="flex flex-col items-center gap-4 mb-8 mt-4">
            <div className="relative">
              {previewUrl || userData.avatar ? (
                <img
                  src={previewUrl || `${api}/${userData.avatar}?t=${Date.now()}`}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 shadow"
                />
              ) : (
                <FaRegUser className="w-28 h-28 rounded-full border-4 border-blue-200 shadow p-6 text-gray-400" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file:mr-4 file:py-1 file:px-2 file:border-0 file:rounded bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
            {selectedImage && (
              <button onClick={handleUpload} className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                Save Picture
              </button>
            )}
            <button
              onClick={() => setIsEditing((e) => !e)}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
            >
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </button>
          </div>
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded mb-6 text-sm">
            <strong className="block font-semibold mb-1">
              Profile Update Reminder
            </strong>
            Please update your profile, especially your nickname and phone number. A thoughtful nickname helps preserve your privacy until a match is confirmed. Choose one that’s meaningful, respectful, and appropriate.
          </div>


          {/* Form Inputs */}
          <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { key: "nickname", label: "Nick Name" },
              { key: "first_name", label: "First Name" },
              { key: "last_name", label: "Last Name" },
              { key: "email", label: "Email" },
              { key: "phone", label: "Phone Number" },
              { key: "age", label: "Age" },
              { key: "numberOfKids", label: "Number of Kids" },
              { key: "location", label: "Location" },
              { key: "stateOfOrigin", label: "State of Origin" },
              { key: "ethnicity", label: "Ethnicity" },
              { key: "height", label: "Height" },
              { key: "weight", label: "Weight" },
              { key: "genotype", label: "Genotype" },
              { key: "bloodGroup", label: "Blood Group" },
              { key: "complexion", label: "Complexion" },
              { key: "maritalStatus", label: "Marital Status" },
              { key: "qualification", label: "Qualification" },
              { key: "profession", label: "Profession" },
              { key: "hobbies", label: "Hobbies" },
              { key: "religiousLevel", label: "Religious Level" },
              { key: "spouseQualities", label: "Spouse Qualities" },
              { key: "dealBreakers", label: "Deal Breakers" },
              { key: "physicalChallenges", label: "Physical Challenges" },
              { key: "bio", label: "Bio" },
              { key: "gender", label: "Gender" },
            ].map(({ key, label }) => {
              const isDisabled = ["first_name", "last_name", "email", "age", "gender",].includes(key);
              return (
                <div key={key}>
                  <label className="block text-sm font-semibold text-blue-800 mb-1">{label}</label>
                  {selectFields[key] ? (
                    <select
                      name={key}
                      value={userData[key] || ""}
                      onChange={handleInputChange}
                      disabled={isDisabled || !isEditing}
                      required
                      className={`w-full rounded-md px-3 py-2 border text-sm shadow-sm ${isDisabled || !isEditing
                        ? "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        }`}
                    >
                      <option value="">Select {label}</option>
                      {selectFields[key].map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      name={key}
                      value={userData[key] || ""}
                      onChange={handleInputChange}
                      disabled={isDisabled || !isEditing}
                      required
                      className={`w-full rounded-md px-3 py-2 border text-sm shadow-sm ${isDisabled || !isEditing
                        ? "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        }`}
                    />
                  )}
                </div>
              );
            })}
          </form>

          {/* Save Button */}
          {isEditing && (
            <div className="mt-6 text-center">
              <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          )}

          {/* Logout */}
          <div className="mt-10 text-center">
            <button onClick={handleLogout} className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
