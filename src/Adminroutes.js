import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MatchesComponent from "./App/Admin/Macthes";
import UsersComponent from "./App/Admin/Users";
import AdminLogin from "./App/Admin/Login";
import AdminSignup from "./App/Admin/signup";
import AdminProfile from "./App/Admin/AdminProfile";
import ContactMessagesComponent from "./App/Admin/Messages";
import GalleryTable from "./App/Admin/GalleryTable";
import Galleryform from "./App/Admin/Galleryform";

function AdminRoutes() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/users" element={<UsersComponent />} />
        <Route path="/matched-users" element={<MatchesComponent />} />
        <Route path="/messages" element={<ContactMessagesComponent />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminsignup" element={<AdminSignup />} />
        <Route path="/adminprofile" element={<AdminProfile />} />
        <Route path="/GalleryTable" element={<GalleryTable />} />
        <Route path="/CreateGallery" element={<Galleryform />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AdminRoutes;
