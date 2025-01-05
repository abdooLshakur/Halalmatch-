import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import proimg1 from "../usersend/productimg/bqq09261_natural_xl.webp"

function Manageproduct(){
    const [verified, setVerified] = useState();
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [merchantid, setMerchantId] = useState("");
    const handleEditButtonClick = (productId) => {
      setSelectedProductId(productId);
    };
    useEffect(() => {
      const storedMerchant = localStorage.getItem("merchant");
      if (storedMerchant) {
        setMerchantId(storedMerchant.replace(/"/g, ""));
      }
    }, []);

    const getproduct = () => {
        fetch(`http://ecommerce.reworkstaging.name.ng/v2/products?merchant_id=${merchantid}&limit=20`)
          .then((resp) => resp.json())
          .then((data) => {
            setVerified(data.data);
            console.log(data.data);
          })
          .catch((err) => {
            console.log(err.message); 
          });
      }
      useEffect(() => {
        getproduct();
      }, [merchantid]);
    return(
        <>
            <div className="dash">
            <div>
                <Sidebar/>
            </div>
            <div className="mainbody">
                <div className="manageproduct-grid">
                    {verified && verified.map((item) =>(
                  <div key={item.id}>
                <img src={item.images ? item.images : proimg1} alt="" />
                <div className="prt1">
                  <span style={{ fontWeight: "600" }}>{item.title}</span> <br />
                  <span>{item.descp}</span>
                </div>
                <div className="flexx">
                  <div><span>£{item.price} <strike>£55.00</strike></span></div>
                  <div><span className="red">Save 20%</span></div>
                </div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"95%",margin:"auto"}}>
                    <div><Link to={`/editproduct`}><button className="edit" onClick={() => handleEditButtonClick(item.id)}>Edit</button></Link></div>
                    <div><button className="delete">Delete</button></div>
                </div>
              </div>
                ))}
                </div>
            </div>
        </div>
        </>
    )
}
export default Manageproduct;