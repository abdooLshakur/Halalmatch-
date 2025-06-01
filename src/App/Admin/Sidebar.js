import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-full md:w-64 bg-white shadow-md min-h-screen p-4 space-y-6 fixed md:relative z-10">
      <h2 className="text-xl font-bold text-indigo-600">Admin Panel</h2>
      <nav className="space-y-4">
        <Link to="/matched-users" className="block text-gray-700 hover:text-indigo-600">Matches</Link>
        <Link to="/users" className="block text-gray-700 hover:text-indigo-600">Users</Link>
        <Link to="/admins" className="block text-gray-700 hover:text-indigo-600">Admins</Link>
        <Link to="/adminprofile" className="block text-gray-700 hover:text-indigo-600">profile</Link>
        <Link to="/GalleryTable" className="block text-gray-700 hover:text-indigo-600">Gallery</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
