import "./Dash.css"
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
function Merchantprofile(){
    const [merchantid, setmerchantid] = useState("");
    useEffect(() => {
        const storedmerchant = localStorage.getItem("merchant");
        if (storedmerchant) {
            setmerchantid(storedmerchant.replace(/"/g, ""));  
        }
       
    }, []); 
    console.log(merchantid)
   
  
    return(
        <>
        
        <div className="dash">
            <div>
                <Sidebar/>
            </div>
            <div className="mainbody">
                <div><h1>Merchant</h1></div>
                <button >get categoties</button>
                <div className="bodyholder">
                    <table>
                        <td>
                            <tr>hnhsjhgds</tr>
                            <tr>gjsdhjkjds</tr>
                            <tr>ujhmsidius</tr>
                            <tr>uhjdsidsh</tr>
                            <tr>hjsdiujjk</tr>
                            <tr>ujeyfdyufy</tr>
                        </td>
                        <td>
                            <tr>hnhsjhgds</tr>
                            <tr>gjsdhjkjds</tr>
                            <tr>ujhmsidius</tr>
                            <tr>uhjdsidsh</tr>
                            <tr>hjsdiujjk</tr>
                            <tr>ujeyfdyufy</tr>
                        </td>
                        <td>
                            <tr>hnhsjhgds</tr>
                            <tr>gjsdhjkjds</tr>
                            <tr>ujhmsidius</tr>
                            <tr>uhjdsidsh</tr>
                            <tr>hjsdiujjk</tr>
                            <tr>ujeyfdyufy</tr>
                        </td>
                        <td>
                            <tr>hnhsjhgds</tr>
                            <tr>gjsdhjkjds</tr>
                            <tr>ujhmsidius</tr>
                            <tr>uhjdsidsh</tr>
                            <tr>hjsdiujjk</tr>
                            <tr>ujeyfdyufy</tr>
                        </td>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}
export default Merchantprofile;