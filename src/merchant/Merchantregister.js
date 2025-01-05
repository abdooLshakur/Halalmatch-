import "./Merchantlogin.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Sidebar from "./Sidebar";
function Merchantregister() {
    const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [descp, setdescp] = useState("")
  const [storename, setstorename] = useState("")
  const [error, setError] = useState(false)
  const [emailchecked, setEmailchecked] = useState(false)
  const [apiaData, setApiData] = useState([])
  const Navigate = useNavigate()

  const handleEventCheque = (e) => {
    e.target.checked ? setEmailchecked(true) : setEmailchecked(false)
  }

  const handleEvent = (e) => {
    e.preventDefault()
    if (fname === "" || lname === "" || email === "" || phone === "" || password === "" || descp === "" || storename === "") {
      setError(true)
      return
    }
    let DataObject = {
      first_name: fname,
      last_name: lname,
      email: email,
      phone: phone,
      password: password,
      storename: storename,
      descp: descp
    }
    console.log(DataObject)

    fetch(`http://ecommerce.reworkstaging.name.ng/v2/merchants`, {
      method: "POST",
      headers: { "Content-type": "Application/Json" },
      body: JSON.stringify(DataObject)
    })
      .then((resp) => resp.json())
      .then((data) => {
        setApiData(data)
        alert("signup succesful")
        Navigate("/Merchant")
        console.log(apiaData)
      })
      .catch((err) => {
        alert("error fetching data", err)
      })

  }
    return(
        <div>
           <div className="dash">
            <div style={{width:"100%"}}>
                <Sidebar/>
            </div>
            <div className="merchantregister-container">
                <div className="register-container">
                    <div><h1>Create Merchant Account</h1></div>
                    <div style={{textAlign:'center', fontWeight:"500"}}>Register using your email</div>
                    <div>
                        <label htmlFor="">Title (Optional)</label><br />
                        <select className="gender" name="">
                            <option value=""></option>
                            <option value="">Mr</option>
                            <option value="">Mrs</option>
                            <option value="">Miss</option>
                            <option value="">Ms</option>
                            <option value="">Mx</option>
                            <option value="">Sir</option>
                        </select>
                    </div>
                    <form action="" onSubmit={handleEvent} >
                    <div>
                        <label htmlFor="">First Name</label><br />
                        <input type="text" value={fname} onChange={(e) => setFname(e.target.value)}/>
                        {error === true && fname === "" ? <span className="error-span01">please enter first name</span> : null}
                    </div>
                    <div>
                        <label htmlFor="">Last Name</label><br />
                        <input type="text" value={lname} onChange={(e) => setLname(e.target.value)}/>
                        {error === true && lname === "" ? <span className="error-span01">please enter Last name</span> : null}
                    </div>
                    <div>
                        <label htmlFor="">Phone</label><br />
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                        {error === true && lname === "" ? <span className="error-span01">please enter Phone</span> : null}
                    </div>
                    <div>
                        <label htmlFor="">store Name</label><br />
                        <input type="text" value={storename} onChange={(e) => setstorename(e.target.value)}/>
                        {error === true && lname === "" ? <span className="error-span01">please enter Last name</span> : null}
                    </div>
                    <div>
                        <label htmlFor="">Discription</label><br />
                        <input type="text" value={descp} onChange={(e) => setdescp(e.target.value)}/>
                        {error === true && lname === "" ? <span className="error-span01">please enter Last name</span> : null}
                    </div>
                    <div>
                        <label htmlFor="">Email</label><br />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        {error === true && email === "" ? <span className="error-span01">please enter Email</span> : null}
                    </div>

                    <div>
                        <label htmlFor="">Password</label><br />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br />
                        {error === true && fname === "" ? <span className="error-span01">please enter Password</span> : null}
                        <span>Your password must be at least 6 characters long</span>
                    </div>

                    <div className="button"><button>Create Merchant</button></div>
                    </form>
                </div>
                
                </div>
            </div>
           
        </div>
    )
}
export default Merchantregister;