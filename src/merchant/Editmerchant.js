import { useEffect, useState } from 'react'
import "./Merchantlogin.css";
import { useNavigate } from "react-router-dom"
import Sidebar from "./Sidebar";
const EditmerchantForm = ()=> {
    const navigate = useNavigate()
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [descp, setdescp] = useState("")
    const [icon, seticon] = useState("")
    const [phones, setphones] = useState("")
    const [district, setdistrict] = useState("")
    const [state, setstate] = useState("")
    const [banner, setbanner] = useState("")
    const [storename, setstorename] = useState("")
    const [error, setError] = useState(false)
    const [id, setId] = useState("");

    useEffect(() => {
        const storedId = localStorage.getItem("merchant");
        if (storedId) {
            setId(storedId.replace(/"/g, ""));  
        }
       
    }, []);
    console.log(id)

    const handleEdit = (e) => {
        e.preventDefault();
        if (
            fname === '' || phone === '' || email === '' || lname === '' || icon === '' || banner === '' || phones === '' || district === '' || storename === '' || state === ''
        ) {
            setError(true);
            return;
        }
        const newUser = {
            first_name: fname,
            last_name: lname,
            phone: phone,
            email: email,
            store_name: storename,
            icon: icon,
            banner: banner,
            state: state,
            district: district,
            phones: phones,
        }
        console.log(newUser)
        fetch(`http://ecommerce.reworkstaging.name.ng/v2/merchants/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser)
        })
        .then((res) => res.json().then((data) => ({ status: res.status, body: data })))
        .then(({ status, body }) => {
          console.log(body);
          if (status === 200) {
            alert("Update successful");
            navigate("/merchant");
          } else {
            setError(true);
            alert("Please fill in all filled");
          }
        })
        .catch((err) => {
          console.error(err);
          setError(true);
          alert("An error occurred during password change. Please try again.");
        });
    }


  return (
    <div>
    <div className="dash">
     <div style={{width:"100%"}}>
         <Sidebar/>
     </div>
     <div className="merchantregister-container">
        {
         <div className="register-container">
             <div><h1> updated Merchant Account</h1></div>
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
             <form action="" onSubmit={handleEdit} >
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
                 <label htmlFor="">Avater</label><br />
                 <input type="text" value={icon} onChange={(e) => seticon(e.target.value)}/>
                 {error === true && icon === "" ? <span className="error-span01">please enter Avater</span> : null}
             </div>
             <div>
                 <label htmlFor="">Add More Phones</label><br />
                 <input type="text" value={phones} onChange={(e) => setphones(e.target.value)}/>
                 {error === true && phones === "" ? <span className="error-span01">please enter More Phones</span> : null}
             </div>
             <div>
                 <label htmlFor="">Banner</label><br />
                 <input type="text" value={banner} onChange={(e) => setbanner(e.target.value)}/>
                 {error === true && banner === "" ? <span className="error-span01">please Put your Banner</span> : null}
             </div>
              <div>
                 <label htmlFor="">State</label><br />
                 <input type="text" value={state} onChange={(e) => setstate(e.target.value)}/>
                 {error === true && state === "" ? <span className="error-span01">please enter Email</span> : null}
             </div>
             <div>
                 <label htmlFor="">District</label><br />
                 <input type="text" value={district} onChange={(e) => setdistrict(e.target.value)}/>
                 {error === true && district === "" ? <span className="error-span01">please enter Disstrict</span> : null}
             </div>
             
             <div className="button"><button>Update Merchant</button></div>
             </form>
         </div>
}
         </div>
     </div>
    
 </div>
  );
};

export default EditmerchantForm;
