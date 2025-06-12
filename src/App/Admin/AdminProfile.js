import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { FaEdit, FaSave, FaSignOutAlt, FaCamera } from "react-icons/fa";

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
      } catch {
        // Bad cookie format or JSON parse error
        Cookies.remove("Admin", { path: "/" });
        navigate("/Adminlogin");
      }
    } else {
      navigate("/Adminlogin");
    }
  }, []);

  const fetchAdminData = async (id) => {
    try {
      const res = await fetch(`${api}/Admin/${id}`, {
        credentials: "include",
      });

      if (res.status === 401) {
        Cookies.remove("Admin", { path: "/" });
        Cookies.remove("token", { path: "/" });
        navigate("/Adminlogin");
        return;
      }

      const result = await res.json();
      if (result.success) {
        setAdminData(result.data);
      } else {
        toast.error("Failed to fetch admin data");
      }
    } catch {
      toast.error("Network error while fetching admin data");
    }
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
        credentials: "include",
      });
      const result = await response.json();
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
    const requiredKeys = ["age", "location", "stateOfOrigin"];
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
        credentials: "include",
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
    <div className="flex bg-gray-100 min-h-screen">
      <ToastContainer />
      <Sidebar />
      <main className="flex-1 p-6 sm:p-10">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="relative">
              <img
                src={previewUrl || (AdminData.avatar ? `${api}/${AdminData.avatar}?t=${Date.now()}` : "/default-avatar.png")}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
              />
              <label className="absolute bottom-0 right-0 cursor-pointer">
                <FaCamera className="text-xl text-blue-600" />
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
              {selectedImage && (
                <button onClick={handleUpload} className="mt-2 w-full py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Upload
                </button>
              )}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-800">{AdminData.first_name} {AdminData.last_name}</h2>
              <p className="text-gray-500">{AdminData.email}</p>
              <button onClick={() => setIsEditing(!isEditing)} className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                {isEditing ? <FaEdit /> : <FaEdit />} {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {["first_name", "last_name", "email", "age", "gender", "location", "stateOfOrigin"].map((field) => {
              const isReadOnly = ["first_name", "last_name", "email", "age", "gender"].includes(field) || !isEditing;
              return (
                <div key={field}>
                  <label className="block mb-1 text-sm font-medium text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                  <input
                    type="text"
                    name={field}
                    value={AdminData[field] || ""}
                    onChange={handleInputChange}
                    readOnly={isReadOnly}
                    className={`w-full px-4 py-2 text-sm rounded border focus:outline-none focus:ring ${isReadOnly ? "bg-gray-100 border-gray-300" : "border-blue-400"}`}
                  />
                </div>
              );
            })}
          </div>

          {isEditing && (
            <div className="mt-6 text-center">
              <button onClick={handleSave} className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                <FaSave /> Save Changes
              </button>
            </div>
          )}

          <div className="mt-10 text-center">
            <button onClick={handleLogout} className="inline-flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
