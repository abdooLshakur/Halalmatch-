import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const Navigate = useNavigate()
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
    fetch("https://3bf8-102-91-93-50.ngrok-free.app/api/merchant-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UserDetails),
    })
      .then((res) => res.json().then((data) => ({ status: res.status, body: data }))) 
      .then(({ status, body }) => {    
        if (status === 200 && body.success === true) {
          localStorage.setItem("merchant", JSON.stringify(body.data.id));
          alert("Login successful");
          Navigate("/dashboard");
        } else {
          setError(true);
          alert(body.message || "Invalid credentials"); 
        }
      })
      .catch((err) => {
        console.error(err); 
        setError(true);
        alert("An error occurred during login. Please try again.");
      });
    
    
  }
  return (
    <div className="max-w-full mx-auto mt-16 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>
      <form className="space-y-4 mt-6" onSubmit={handleEvent}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          required
          value={email} onChange={(e) => setEmail(e.target.value)}
        />
        {error === true && email === "" ? <span className="error-span01">please enter Email</span> : null}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          required
          value={password} onChange={(e) => setPassword(e.target.value)}
        />
        {error === true && password === "" ? <span className="error-span01">please enter Password</span> : null}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
      <p className="text-center mt-4 text-sm text-gray-600">
        Don’t have an account? <a href="/signup" className="text-blue-500">Signup</a>
      </p>
    </div>
  );
};

export default Login;
