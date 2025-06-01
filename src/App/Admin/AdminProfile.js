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
  const api = "https://api.halalmacthmakings.com";

  const navigate = useNavigate();

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  };

  const selectFields = {
    genotype: ["AA", "AS", "SS", "AC", "SC", "CC"],
    bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    complexion: ["Fair", "Light Brown", "Dark", "Albino"],
    maritalStatus: ["Single", "Married", "Divorced", "Widowed", "Separated"],
    qualification: ["High School", "Diploma", "Bachelor's", "Master's", "PhD"],
    religiousLevel: ["Not Practicing", "Moderate", "Strict"],
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
      "age", "numberOfKids", "location", "stateOfOrigin", "ethnicity",
      "height", "weight", "genotype", "bloodGroup", "complexion",
      "qualification", "profession", "hobbies", "religiousLevel",
      "spouseQualities", "dealBreakers", "physicalChallenges", "bio"
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
    <div className="flex">
      <Sidebar/>
    <div className="w-[84vw] max-w-full py-6 bg-white min-h-screen overflow-x-hidden">
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-4 mb-6">
          <img
            src={
              previewUrl ||
              (AdminData.avatar ? `${api}/${AdminData.avatar}?t=${Date.now()}` : <FaRegUser className="w-full h-full text-gray-500" />)
            }
            alt=""
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 shadow-md"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm text-gray-600 file:mr-4 file:py-1 file:px-2 file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
          {selectedImage && (
            <button
              onClick={handleUpload}
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Save Picture
            </button>
          )}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            {isEditing ? "Cancel Edit" : "Edit Profile"}
          </button>
        </div>
  
        <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { key: "first_name", label: "First Name" },
            { key: "last_name", label: "Last Name" },
            { key: "email", label: "Email" },
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
            const isAlwaysDisabled = ["first_name", "last_name", "email", "age", "gender"].includes(key);
            return (
              <div key={key} className="w-full">
                <label className="block text-sm font-semibold text-blue-800">{label}</label>
                {selectFields[key] ? (
                  <select
                    name={key}
                    value={AdminData[key] || ""}
                    onChange={handleInputChange}
                    disabled={isAlwaysDisabled || !isEditing}
                    required
                    className={`mt-1 block w-full rounded-md border ${isAlwaysDisabled || !isEditing ? "border-blue-300 bg-blue-100" : "border-blue-400 bg-white"
                      } shadow-sm text-sm`}
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
                    value={AdminData[key] || ""}
                    onChange={handleInputChange}
                    disabled={isAlwaysDisabled || !isEditing}
                    required
                    className={`mt-1 block w-full rounded-md border ${isAlwaysDisabled || !isEditing ? "border-blue-300 bg-blue-100" : "border-blue-400 bg-white"
                      } shadow-sm text-sm`}
                  />
                )}
              </div>
            );
          })}
        </form>
  
        {isEditing && (
          <div className="mt-6 text-center">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
  
      <div className="mt-6 text-center">
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
  );
}
