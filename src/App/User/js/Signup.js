import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import softRoseBg from "../images/bg2.png";

const Signup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [password, setPassword] = useState("");
  const [marriageIntentDuration, setMarriageIntentDuration] = useState("");
  const [pledgeAccepted, setPledgeAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const api = "https://api.halalmatchmakings.com";

  const handleEvent = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!navigator.onLine) {
      toast.error("You're offline. Please check your internet connection.");
      setIsLoading(false);
      return;
    }

    const isEmpty = (field) => !field.toString().trim();

    if (
      isEmpty(fname) ||
      isEmpty(lname) ||
      isEmpty(email) ||
      isEmpty(phone) ||
      isEmpty(dob) ||
      isEmpty(gender) ||
      isEmpty(maritalStatus) ||
      isEmpty(password) ||
      isEmpty(marriageIntentDuration) ||
      !pledgeAccepted
    ) {
      setError(true);
      toast.warning("Please complete all fields and accept the pledge.");
      setIsLoading(false);
      return;
    }

    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      setError(true);
      toast.error("You must be at least 18 years old to sign up.");
      setIsLoading(false);
      return;
    }

    const signupData = {
      first_name: fname.trim(),
      last_name: lname.trim(),
      age,
      email: email.trim(),
      password: password.trim(),
      gender: gender.trim(),
      location: "",
      maritalStatus: maritalStatus.trim(),
      marriageIntentDuration: marriageIntentDuration.trim(),
      pledgeAccepted,
    };

    try {
      const response = await fetch(`${api}/register-User`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      if (!response.ok || !data.success) {
        console.error("Signup failed:", data);
        toast.error(data.message || "Signup failed.");
        return;
      }

      if (data.success) {
        toast.success(data.message || "Sign up successful!");
        setTimeout(() => navigate("/login"), 500);
      } else {
        setError(true);
        toast.error(data.message || "Signup failed.");
        console.error("Signup failed:", data);
      }
    } catch (err) {
      setError(true);
      toast.error(err.message || "An error occurred during signup.");
      console.error("Signup failed:", err.message);

    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const handleOffline = () => toast.error("You're offline. Check your internet connection.");
    const handleOnline = () => toast.success("Back online!");

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return (
    <div
      className="min-h-screen w-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${softRoseBg})` }}
    >
      <Navbar />
      <ToastContainer />

      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-4xl bg-white/30 backdrop-blur-xl p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Signup</h2>

          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleEvent}
          >
            <input type="text" placeholder="First Name" className="p-3 border bg-white/60 rounded-lg" value={fname} onChange={(e) => setFname(e.target.value)} />
            <input type="text" placeholder="Last Name" className="p-3 border bg-white/60 rounded-lg" value={lname} onChange={(e) => setLname(e.target.value)} />
            <input type="date" className="p-3 border bg-white/60 rounded-lg" value={dob} onChange={(e) => setDob(e.target.value)} />
            <input type="email" placeholder="Email" className="p-3 border bg-white/60 rounded-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="number" placeholder="Phone Number" className="p-3 border bg-white/60 rounded-lg" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <select className="p-3 border bg-white/60 rounded-lg" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <select className="p-3 border bg-white/60 rounded-lg" value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)}>
              <option value="">Select Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorcee</option>
              <option value="Widowed">Widowed</option>
            </select>
            <input type="password" placeholder="Password" className="p-3 border bg-white/60 rounded-lg" value={password} onChange={(e) => setPassword(e.target.value)} />

            <select className="p-3 border bg-white/60 rounded-lg" value={marriageIntentDuration} onChange={(e) => setMarriageIntentDuration(e.target.value)}>
              <option value="">Marriage Intent Duration</option>
              <option value="Less than 3 months">Less than 3 months</option>
              <option value="3 to 6 months">3 to 6 months</option>
              <option value="Less than a year">Less than a year</option>
              <option value="More than a year">More than a year</option>
            </select>
            <div className="md:col-span-2 flex items-start space-x-3">
              <input type="checkbox" checked={pledgeAccepted} onChange={(e) => setPledgeAccepted(e.target.checked)} className="mt-1" />
              <label className="text-sm text-gray-800">
                I sincerely pledge that I'm signing up solely for marriage and for the sake of Allah.
              </label>
            </div>

            <div className="md:col-span-2">
              <button type="submit" className="w-full bg-rose-400 hover:bg-rose-500 text-white font-semibold py-3 rounded-lg transition" disabled={isLoading}>
                {isLoading ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          </form>

          <p className="text-center mt-4 text-sm text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-rose-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
