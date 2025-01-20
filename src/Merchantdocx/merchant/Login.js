import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const Navigate = useNavigate()
  const api = "http://localhost:9000"

  const handleEvent = (e) => {
    e.preventDefault()
    if (email === "" || password === "") {
      setError(true)
      return
    }
    const UserDetails = {
      email: email,
      password: password
    }
    fetch(`${api}/api/merchant-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UserDetails),
    })
    .then((res) => res.json()) 
    .then((data) => {
      if (data.success) {
        // Store relevant data in localStorage
        localStorage.setItem("merchant", data.data.id);
        localStorage.setItem("token", data.data.token);
        alert(data.message); 
        Navigate("/getproduct"); 
      } else {
        setError(true);
        alert(data.message || "Invalid credentials"); 
      }
    })
    .catch((err) => {
      console.error("Error:", err); // Log the error
      setError(true);
      alert("An error occurred during login. Please try again.");
    });
    
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>
      <form className="space-y-4 mt-6" onSubmit={handleEvent}>
        {/* Email Input */}
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && email === "" && (
            <span className="text-red-500 text-sm mt-1 block">
              Please enter an email.
            </span>
          )}
        </div>
  
        {/* Password Input */}
        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && password === "" && (
            <span className="text-red-500 text-sm mt-1 block">
              Please enter a password.
            </span>
          )}
        </div>
  
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
  
      {/* Signup Link */}
      <p className="text-center mt-4 text-sm text-gray-600">
        Don’t have an account?{" "}
        <a href="/signup" className="text-blue-500 hover:underline">
          Signup
        </a>
      </p>
    </div>
  </div>
  
  );
};

export default Login;
