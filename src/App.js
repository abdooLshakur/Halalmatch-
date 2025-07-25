import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./App/User/js/Login";
import Signup from "./App/User/js/Signup";
import ContactPage from "./App/User/js/Contact";
import Landing from "./App/User/js/Landingpage";
import ProfilePage from "./App/User/js/Profilepage";
import ProfileListingPage from "./App/User/js/ProfileListing";
import Notifications from "./App/User/js/Notifications";
import ForgotPassword from "./App/User/js/Requestresetpassword";
import ResetPassword from "./App/User/js/ResetPassword";
import AboutHalalMatch from "./App/User/js/Abouthalal";
import Gallery from "./App/User/js/Gallery";
import Payment from "./App/User/js/Payment";

import MatchesComponent from "./App/Admin/Macthes";
import UsersComponent from "./App/Admin/Users";
import AdminLogin from "./App/Admin/Login";
import AdminSignup from "./App/Admin/signup";
import AdminProfile from "./App/Admin/AdminProfile";
import ContactMessagesComponent from "./App/Admin/Messages";
import GalleryTable from "./App/Admin/GalleryTable";
import Galleryform from "./App/Admin/Galleryform";
import Admins from "./App/Admin/Admins";
import SpecialServices from "./App/User/js/Specialservices";

function App() {

  return (
    <Router>


      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Contact" element={<ContactPage />} />
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profilelisting" element={<ProfileListingPage />} />
        <Route path="/about" element={<AboutHalalMatch />} />
        <Route path="/notification" element={<Notifications />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/activate" element={<Payment />} />
        <Route path="/special-services" element={<SpecialServices />} />
        {/* <Route path="/Dashboard" element={<Dashbard />} /> */}

        <Route path="/users" element={<UsersComponent />} />
        <Route path="/matched-users" element={<MatchesComponent />} />
        <Route path="/messages" element={<ContactMessagesComponent />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-registerform" element={<AdminSignup />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/GalleryTable" element={<GalleryTable />} />
        <Route path="/CreateGallery" element={<Galleryform />} />
        <Route path="/admins" element={<Admins />} />

      </Routes>

    </Router>
  );
}

export default App;
