import "./Merchantlogin.css"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
function Forgotpassword(){
    const [oldpassword, setoldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const [id, setId] = useState("");
    useEffect(() => {
      const storedId = localStorage.getItem("merchant");
      if (storedId) {
          setId(storedId.replace(/"/g, ""));  
      }
     
  }, []);
  console.log(id)
    const handleEvent = (e) => {
      e.preventDefault();
      if (oldpassword === "" || newPassword === "") {
        setError(true);
        return;
      }
  
      const userDetails = {
          old_password: oldpassword,
          new_password: newPassword
      };
      fetch(`http://ecommerce.reworkstaging.name.ng/v2/merchants/${id}/change-passwd`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails)
      })
      .then((res) => res.json().then((data) => ({ status: res.status, body: data })))
      .then(({ status, body }) => {
        console.log(body);
        if (status === 200) {
          alert("Update successful");
          navigate("/dashboard");
        } else {
          setError(true);
          alert("Incorrect Old Password");
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        alert("An error occurred during password change. Please try again.");
      });
    
      
    }
    return(
        <div className="merchantlogin-container">
        <div className="login" >
          <form action="" onSubmit={handleEvent}>
            <div className="merchantlogin">
              <div><h3>Merchant Password Update</h3></div>
              <div><p>Old Password</p><input type="password" value={oldpassword} onChange={(e) => setoldPassword(e.target.value)} /></div>
              {error === true && oldpassword === "" ? <span className="error-span01" >please enter old Password</span> : null}

              <div><p>New Password</p><input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></div>
              {error === true && newPassword === "" ? <span className="error-span01" >please enter New Password</span> : null}
              <div className="button"><button type="submit">Update Password </button></div>
            </div>
          </form>

        </div>
      </div>
    )
}
export default Forgotpassword;