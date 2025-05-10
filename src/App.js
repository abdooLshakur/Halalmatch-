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
import MatchesComponent from "./App/Admin/Macthes";
import UsersComponent from "./App/Admin/Users";
import ContactMessagesComponent from "./App/Admin/Messages";

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
        {/* <Route path="/Dashboard" element={<Dashbard />} /> */}
        <Route path="/users" element={<UsersComponent />} />
        <Route path="/matched-users" element={<MatchesComponent />} />
        <Route path="/messages" element={<ContactMessagesComponent />} />

      </Routes>

    </Router>
  );
}

export default App;
