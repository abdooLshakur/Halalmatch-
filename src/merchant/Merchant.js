import "./Merchantlogin.css"
import { useNavigate,Link } from "react-router-dom"
import { useState } from "react";
import Sidebar from "./Sidebar";
function Merchant() {
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
    fetch("http://ecommerce.reworkstaging.name.ng/v2/merchants/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UserDetails)
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json().then((data) => ({ status: res.status, body: data }));
        } else {
          return res.json().then((data) => ({ status: res.status, body: data }));
        }
      })
      .then(({ status, body }) => {
        console.log(body);
        if (status === 200) {
          localStorage.setItem('merchant', JSON.stringify(body.id));
          localStorage.setItem('merchantdetails', JSON.stringify(body))
          alert("Login successful");
          Navigate("/dashboard");
        } else {
          setError(true);
          alert("Invalid credentials");
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        alert("An error occurred during login. Please try again.");
      });
    
  }
  return (
    <div className="dash">
      <div>
        <Sidebar />
      </div>
      <div className="merchantlogin-container">
        <div className="login" >
          <form action="" onSubmit={handleEvent}>
            <div className="merchantlogin">
              <div><h3>Merchant Sign In</h3></div>
              <div><p>Email Address</p><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              {error === true && email === "" ? <span className="error-span01">please enter Email</span> : null}
              <div><p>Password</p><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
              {error === true && password === "" ? <span className="error-span01" >please enter Password</span> : null}
              <div><Link to={"/update-password"}><span>Forgot Password</span></Link></div>
              <div className="update_btn"><Link to={"/Editmerchant"}><button>Update Merchant</button></Link></div>
              <div className="button"><button type="submit">Sign In </button></div>
            </div>
          </form>

        </div>
      </div>
    </div>

  )
}
export default Merchant;