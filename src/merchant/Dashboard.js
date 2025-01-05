import { useState, useEffect } from "react";
import "./Dash.css"
import Sidebar from "./Sidebar";
function Dashboard(){
    const [merchantid, setMerchantId] = useState("");
    const [verified, setVerified] = useState();
    useEffect(() => {
        const storedMerchant = localStorage.getItem("merchant");
        if (storedMerchant) {
          setMerchantId(storedMerchant.replace(/"/g, ""));
        }
      }, []);
//   console.log(merchantid)
      const getproduct = () => {
          fetch(`http://ecommerce.reworkstaging.name.ng/v2/products?merchant_id=${merchantid}&limit=10&offset=11`)
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
                <div style={{}}><h1>Dashbaord</h1></div>                
                <div className="dash_holder">
                    <div className="dash_box">
                        <div>
                            <>
                                <h1>Total Products</h1>
                                <h3 style={{textAlign:"left", margin:"20px 5px"}}>{verified?.length}</h3>
                            </>
                        </div>
                        <div>
                            <h1>Total Sale</h1>
                            <h3 style={{textAlign:"left", margin:"20px 5px"}}>1000000</h3>
                        </div>
                        <div>
                            <h1>Total Profit</h1>
                            <h3 style={{textAlign:"left", margin:"20px 5px"}}>$200000000</h3>
                        </div>
                    </div>
<table id="customers">
  <tr>
    <th>image</th>
    <th>Title</th>
    <th>Price</th>
    <th>Category</th>
    <th>Brand</th>
    <th>Quantity</th>
  </tr>
 {verified?.map((item) => (
     <tr>
     <td className="table_image"><img src={item.images} alt="" /></td>
     <td>{item.title}</td>
     <td>${item.price}</td>
     <td>{item.category.name}</td>
     <td>{item.brand}</td>
     <td>{item.quantity}</td>
   </tr>
 ))
    
 }
 
</table>
                </div>
            </div>
        </div>
        </>
    )
}
export default Dashboard;