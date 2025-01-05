import "./Dash.css"
import { Link } from "react-router-dom";
import logo from "./img/nbtbd6wfuh2evqkj9w0a-removebg-preview.png"
function Sidebar(){
    
    return(
        <>
            <div className="sidedash">
                <div className="sidedash_container">
                    <ul>
                        <li className="logooo"><Link to={"/"}><img src={logo}/></Link></li>
                        <li><Link to={"/Dashboard"}>Dashboard</Link></li>
                        {/* <li><Link to={"merchantprofile"}>Merchant</Link></li> */}
                        <li><Link to={"/manage-product"}>Manage Product</Link></li>
                        <li><Link to={"/Createcategory"}>Create Category</Link></li>
                        <li><Link to={"/Create-product"}>Create Product</Link></li>
                        <li><Link to={"/Merchantregister"}>Create Merchant</Link></li>
                        <li><Link to={"/merchantlogin"}>Merchant Login</Link></li>
                        {/* <li><Link to={"#"}></Link></li> */}
                        {/* <li><Link to={"#"}></Link></li> */}
                        {/* <li><Link to={"#"}></Link></li> */}
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Sidebar;