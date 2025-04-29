import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

const Signup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setdob] = useState("");
  const [Gender, setGender] = useState("");
  const [maritalStatus, setmaritalstatus] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const Navigate = useNavigate();
  const api = "https://halal-1.onrender.com";

  const handleEvent = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const isEmpty = (field) => !field.trim();

    if (
      isEmpty(fname) ||
      isEmpty(lname) ||
      isEmpty(email) ||
      isEmpty(dob) ||
      isEmpty(Gender) ||
      isEmpty(maritalStatus) ||
      isEmpty(password)
    ) {
      setError(true);
      toast.warning("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    // ✅ Calculate age from DOB
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // ✅ Prevent underage signup
    if (age < 18) {
      setError(true);
      toast.error("You must be at least 18 years old to sign up.");
      setIsLoading(false);
      return;
    }

    const signupData = {
      first_name: fname.trim(),
      last_name: lname.trim(),
      age, // store computed whole number age
      email: email.trim(),
      maritalStatus: maritalStatus.trim(),
      password: password.trim(),
      gender: Gender.trim(),
    };

    const apiUrl = `${api}/register-User`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      if (data.success) {
        toast.success(data.message || "Sign up successful!");
        setTimeout(() => {
          Navigate("/login");
        }, 500);
      } else {
        setError(true);
        toast.error(data.message || "Signup failed.");
      }
    } catch (err) {
      console.error("Signup Error:", err.message || err);
      setError(true);
      toast.error(
        err.message || "An error occurred during signup. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div>
      <Navbar />
      <div className="w-[99vw] h-screen flex items-center justify-center bg-gray-100 relative">
        <ToastContainer />

        <div className="signup w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Signup</h2>

          <form
            className="space-y-4 mt-6 grid grid-cols-2 gap-6"
            onSubmit={handleEvent}
          >
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
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
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
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
                placeholder="date"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
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
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
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
              <select
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
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
              <select
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                onChange={(e) => setmaritalstatus(e.target.value)}
                value={maritalStatus}
              >
                <option value="">Select maritalstatus</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
              {error && maritalStatus === "" && (
                <span className="text-red-500 text-sm mt-1 block">
                  Please select Marital Status.
                </span>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && password === "" && (
                <span className="text-red-500 text-sm mt-1 block">
                  Please enter Password.
                </span>
              )}
            </div>

            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                disabled={isLoading}
              >
                {isLoading ? <span className="spinner"></span> : "Sign Up"}
              </button>
            </div>
          </form>

          {/* Already have an account */}
          <p className="text-center mt-4 text-sm text-gray-600 col-span-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>

  );
};

export default Signup;
