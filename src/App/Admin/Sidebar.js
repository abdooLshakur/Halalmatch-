import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Make sure you installed `lucide-react`

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle button */}
      <div className="md:hidden p-4 flex justify-between items-center">
        <button onClick={toggleSidebar}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-30 p-6 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 md:relative md:right-auto md:w-64 md:shadow-none md:block`}
      >
        <h2 className="text-xl font-bold text-indigo-600 mb-4">Admin Panel</h2>
        <nav className="space-y-4">
          <Link to="/matched-users" className="block text-gray-700 hover:text-indigo-600">Matches</Link>
          <Link to="/users" className="block text-gray-700 hover:text-indigo-600">Users</Link>
          <Link to="/admins" className="block text-gray-700 hover:text-indigo-600">Admins</Link>
          <Link to="/GalleryTable" className="block text-gray-700 hover:text-indigo-600">Gallery</Link>
          <Link to="/adminprofile" className="block text-gray-700 hover:text-indigo-600">Profile</Link>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
