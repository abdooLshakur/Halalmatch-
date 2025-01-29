import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [descp, setDescp] = useState("");
  const [storename, setStorename] = useState("");
  const [error, setError] = useState(false);
  const Navigate = useNavigate();
  const api = "https://zmh-api.onrender.com"


  const handleEvent = (e) => {
    e.preventDefault();

    if (
      fname === "" ||
      lname === "" ||
      email === "" ||
      phone === "" ||
      password === "" ||
      descp === "" ||
      storename === ""
    ) {
      setError(true);
      return;
    }

    const payload = {
      first_name: fname,
      last_name: lname,
      email,
      phone,
      password,
      store_name: storename,
      descp,
    };

    fetch(`${api}/api/register-merchant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (resp) => {
        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }

        const data = await resp.json();
        return { status: resp.status, body: data };
      })
      .then(({ status, body }) => {
        console.log(body);
        if (status === 200 && body.success === true) {
          alert("Signup successful");
          Navigate("/");
        } else {
          setError(true);
          alert(body.message);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        alert("An error occurred during signup. Please try again.");
      });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 relative">
    <div className="absolute top-4 left-4">
      <button
        className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
        onClick={() => window.history.back()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>
    </div>
    <div className="signup w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Signup</h2>
      <form
        className="space-y-4 mt-6 grid grid-cols-2 gap-6"
        onSubmit={handleEvent}
      >
        {/* Business Name */}
        <div className="col-span-2">
          <input
            type="text"
            placeholder="Business Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={storename}
            onChange={(e) => setStorename(e.target.value)}
            required
          />
          {error && storename === "" && (
            <span className="text-red-500 text-sm mt-1 block">
              Please enter Store name.
            </span>
          )}
        </div>
  
        {/* Business Description */}
        <div className="col-span-2">
          <input
            type="text"
            placeholder="Business Description"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={descp}
            onChange={(e) => setDescp(e.target.value)}
            required
          />
          {error && descp === "" && (
            <span className="text-red-500 text-sm mt-1 block">
              Please enter Business or Shop Description.
            </span>
          )}
        </div>
  
        {/* First Name */}
        <div>
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
          {error && fname === "" && (
            <span className="text-red-500 text-sm mt-1 block">
              Please enter First name.
            </span>
          )}
        </div>
  
        {/* Last Name */}
        <div>
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />
          {error && lname === "" && (
            <span className="text-red-500 text-sm mt-1 block">
              Please enter Last name.
            </span>
          )}
        </div>
  
        {/* Phone */}
        <div>
          <input
            type="number"
            placeholder="Phone"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {error && phone === "" && (
            <span className="text-red-500 text-sm mt-1 block">
              Please enter Phone Number.
            </span>
          )}
        </div>
  
        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && email === "" && (
            <span className="text-red-500 text-sm mt-1 block">
              Please enter Email.
            </span>
          )}
        </div>
  
        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && password === "" && (
            <span className="text-red-500 text-sm mt-1 block">
              Please enter Password.
            </span>
          )}
        </div>
  
        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default Signup;
