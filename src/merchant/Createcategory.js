import "./Merchantlogin.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Sidebar from "./Sidebar";
function Createcategory() {
    const [name, setname] = useState("")
    const [image, setimage] = useState("")
    const [error, setError] = useState(false)
    const [emailchecked, setEmailchecked] = useState(false)
    const [apiaData, setApiData] = useState([])
    const Navigate = useNavigate()
    const [id, setId] = useState("");
    useEffect(() => {
        const storedId = localStorage.getItem("merchant");
        if (storedId) {
            setId(storedId.replace(/"/g, ""));  
        }
       
    }, []);
  
    const handlecategory = (e) => {
        e.preventDefault()
         e.target.checked ? setEmailchecked(true) : setEmailchecked(false)
        if (name === "" || image === "") {
            setError(true)
            return
        }
        let categoryobj = {
            merchant_id:id,
            name: name,
            image: image            
        }
        console.log(categoryobj)

        fetch(`http://ecommerce.reworkstaging.name.ng/v2/categories`, {
            method: "POST",
            headers: { "Content-type": "Application/Json" },
            body: JSON.stringify(categoryobj)
        })
            .then((resp) => resp.json())
            .then((data) => {
                setApiData(data)
                localStorage.setItem('category', JSON.stringify(data.id));
                alert("Category creaated succesful")
                Navigate("/dashboard")
                console.log(apiaData)
            })
            .catch((err) => {
                alert("error fetching data", err)
            })

    }
    return (
        <div>
            <div className="dash">
                <div style={{ width: "100%" }}>
                    <Sidebar />
                </div>
                <div className="merchantregister-container">
                    <div className="register-container">
                        <div><h1>Create Category</h1></div>
                        <div style={{ textAlign: 'center', fontWeight: "500" }}>Register using your email</div>

                        <form action="" onSubmit={handlecategory} >
                            <div>
                                <label htmlFor="">Category name</label><br />
                                <input type="text" value={name} onChange={(e) => setname(e.target.value)} />
                                {error === true && name === "" ? <span className="error-span01">please enter you category name</span> : null}
                            </div>
                            <div>
                                <label htmlFor="">Category image</label><br />
                                <input type="text" value={image} onChange={(e) => setimage(e.target.value)} />
                                {error === true && image === "" ? <span className="error-span01">please input your image</span> : null}
                            </div>

                            <div className="button"><button>Create Category</button></div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Createcategory;