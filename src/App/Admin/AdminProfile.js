import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { FaRegUser } from "react-icons/fa";


export default function AdminProfile() {
  const [AdminData, setAdminData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [AdminId, setAdminId] = useState(null);
  const api = "https://api.halalmatchmakings.com";

  const navigate = useNavigate();

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  };

 

  useEffect(() => {
    const AdminCookie = getCookie("Admin");
    if (AdminCookie) {
      try {
        const parsed = JSON.parse(AdminCookie);
        setAdminId(parsed.id);
        fetchAdminData(parsed.id);
      } catch { }
    } else {
      navigate("/Adminlogin");
    }
  }, []);

  const fetchAdminData = async (id) => {
    try {
      const res = await fetch(`${api}/Admin/${id}`);
      const result = await res.json();
      if (result.success) {
        setAdminData(result.data);
      }
    } catch { }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("avatar", selectedImage);

    try {
      const response = await fetch(`${api}/update-Admin/${AdminId}`, {
        method: "PUT",
        body: formData,
        credentials: 'include',
      });
      const result = await response.json();
      console.log(result)
      if (result.success) {
        fetchAdminData(AdminId);
      
        const AdminCookie = getCookie("Admin");
        if (AdminCookie && result.data?.avatar) {
          const parsed = JSON.parse(AdminCookie);
          parsed.avatar = result.data.avatar;
          document.cookie = `Admin=${encodeURIComponent(JSON.stringify(parsed))}; path=/`;
        }
      
        setSelectedImage(null);
        setPreviewUrl(null);
        toast.success("Profile picture updated!");
      } else {
        toast.error("Upload failed.");
      }      
    } catch {
      toast.error("Upload failed.");
    }
  };

  const handleInputChange = (e) => {
    setAdminData({ ...AdminData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const requiredKeys = [
      "age",  "location", "stateOfOrigin", 
    ];

    for (const key of requiredKeys) {
      if (!AdminData[key]) {
        toast.error(`Please fill the ${key} field`);
        return;
      }
    }

    try {
      const response = await fetch(`${api}/update-Admin/${AdminId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(AdminData),
      });
      const result = await response.json();
      if (result.success) {
        fetchAdminData(AdminId);
        setIsEditing(false);
        toast.success("Profile updated");
      } else {
        toast.error("Failed to update profile");
      }
    } catch {
      toast.error("Something went wrong while saving");
    }
  };

  const handleLogout = () => {
    Cookies.remove("token", { path: "/" });
    Cookies.remove("Admin", { path: "/" });
    navigate("/adminlogin");
  };
  

 return (
  <div>
    <ToastContainer position="top-right" autoClose={2000} />
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="w-full md:w-[84vw] px-4 md:px-10 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
            <div className="relative">
              <img
                src={
                  previewUrl ||
                  (AdminData.avatar
                    ? `${api}/${AdminData.avatar}?t=${Date.now()}`
                    : "/default-avatar.png")
                }
                alt="Admin avatar"
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 shadow"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 block text-sm text-gray-700 file:mr-4 file:py-1 file:px-3 file:border-0 file:rounded file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {selectedImage && (
                <button
                  onClick={handleUpload}
                  className="mt-2 w-full py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  Save Picture
                </button>
              )}
            </div>

            <div className="flex flex-col gap-3 text-center sm:text-left">
              <h2 className="text-xl font-bold text-gray-800">
                {AdminData.first_name} {AdminData.last_name}
              </h2>
              <p className="text-sm text-gray-600">{AdminData.email}</p>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="self-center sm:self-start px-4 py-2 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                {isEditing ? "Cancel Edit" : "Edit Profile"}
              </button>
            </div>
          </div>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "first_name", label: "First Name" },
              { key: "last_name", label: "Last Name" },
              { key: "email", label: "Email" },
              { key: "age", label: "Age" },
              { key: "location", label: "Location" },
              { key: "stateOfOrigin", label: "State of Origin" },
              { key: "gender", label: "Gender" },
            ].map(({ key, label }) => {
              const isDisabled = ["first_name", "last_name", "email", "age", "gender"].includes(key) || !isEditing;
              return (
                <div key={key}>
                  <label className="text-sm font-medium text-gray-700">{label}</label>
                  <input
                    type="text"
                    name={key}
                    value={AdminData[key] || ""}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                    className={`mt-1 w-full rounded-md border px-3 py-2 text-sm shadow-sm ${
                      isDisabled ? "bg-gray-100 border-gray-300" : "bg-white border-blue-400"
                    }`}
                  />
                </div>
              );
            })}
          </form>

          {isEditing && (
            <div className="mt-6 text-center">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}
