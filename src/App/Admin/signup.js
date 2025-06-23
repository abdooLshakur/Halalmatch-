import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminSignup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setdob] = useState("");
  const [Gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const Navigate = useNavigate();
  const api = "https://api.halalmatchmakings.com";

  const handleEvent = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const isEmpty = (field) => !field.trim();

    if (
      isEmpty(fname) ||
      isEmpty(lname) ||
      isEmpty(email) ||
      isEmpty(phone) ||
      isEmpty(dob) ||
      isEmpty(Gender) ||
      isEmpty(password)
    ) {
      setError(true);
      toast.warning("Please fill in all required fields.");
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
      phone: phone.trim(),
      password: password.trim(),
      gender: Gender.trim(),
    };

    const apiUrl = `${api}/register-Admin`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      if (data.success) {
        toast.success(data.message || "Sign up successful!");
        setTimeout(() => {
          Navigate("/adminlogin");
        }, 500);
      } else {
        setError(true);
        toast.error(data.message || "Signup failed.");
      }
    } catch (err) {
      console.error("Signup Error:", err.message || err);
      setError(true);
      toast.error(err.message || "An error occurred during signup.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-white to-blue-100 px-4">
      <ToastContainer />
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Admin Signup</h2>
        <form
          className="space-y-4 mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleEvent}
        >
          <div>
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
            {error && fname === "" && (
              <span className="text-red-500 text-sm mt-1 block">
                Please enter First name.
              </span>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
            {error && lname === "" && (
              <span className="text-red-500 text-sm mt-1 block">
                Please enter Last name.
              </span>
            )}
          </div>

          <div>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
              value={dob}
              onChange={(e) => setdob(e.target.value)}
            />
            {error && dob === "" && (
              <span className="text-red-500 text-sm mt-1 block">
                Please enter date of birth.
              </span>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && email === "" && (
              <span className="text-red-500 text-sm mt-1 block">
                Please enter Email.
              </span>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {error && phone === "" && (
              <span className="text-red-500 text-sm mt-1 block">
                Please enter Phone number.
              </span>
            )}
          </div>

          <div>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
              onChange={(e) => setGender(e.target.value)}
              value={Gender}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {error && Gender === "" && (
              <span className="text-red-500 text-sm mt-1 block">
                Please select Gender.
              </span>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && password === "" && (
              <span className="text-red-500 text-sm mt-1 block">
                Please enter Password.
              </span>
            )}
          </div>

          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-rose-500 text-white font-medium py-3 rounded-lg hover:bg-rose-600 transition"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/adminlogin" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>

  );
};

export default AdminSignup;
