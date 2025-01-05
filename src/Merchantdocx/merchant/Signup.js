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

    fetch(`https://3bf8-102-91-93-50.ngrok-free.app/api/register-merchant`, {
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
    <div className="signup max-w-4xl mx-auto mt-16 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Signup</h2>
      <form
        className="space-y-4 mt-6 grid grid-cols-2 gap-6"
        onSubmit={handleEvent}
      >
        <input
          type="text"
          placeholder="Business Name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 col-span-2"
          value={storename}
          onChange={(e) => setStorename(e.target.value)}
          required
        />
        {error && storename === "" ? (
          <span className="error-span01">Please enter Store name</span>
        ) : null}

        <input
          type="text"
          placeholder="Business Description"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 col-span-2"
          value={descp}
          onChange={(e) => setDescp(e.target.value)}
          required
        />
        {error && descp === "" ? (
          <span className="error-span01">
            Please enter Business or Shop Description
          </span>
        ) : null}

        <input
          type="text"
          placeholder="First Name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          required
        />
        {error && fname === "" ? (
          <span className="error-span01">Please enter First name</span>
        ) : null}

        <input
          type="text"
          placeholder="Last Name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          required
        />
        {error && lname === "" ? (
          <span className="error-span01">Please enter Last name</span>
        ) : null}

        <input
          type="number"
          placeholder="Phone"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        {error && phone === "" ? (
          <span className="error-span01">Please enter Phone Number</span>
        ) : null}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && email === "" ? (
          <span className="error-span01">Please enter Email</span>
        ) : null}

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && password === "" ? (
          <span className="error-span01">Please enter Password</span>
        ) : null}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition col-span-2"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
