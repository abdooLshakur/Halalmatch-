import UserRoutes from "./Userroutes.js"
import AdminRoutes from "./Adminroutes.js"
function App() {
  const hostname = window.location.hostname;

  // Check if admin subdomain
  if (hostname.startsWith('admin.')) {
    return <AdminRoutes />;
  }

  return <UserRoutes />;
}

export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";




// function App() {

//   return (
//     <Router>


//       <Routes>
        
//         {/* <Route path="/Dashboard" element={<Dashbard />} /> */}

        

//       </Routes>

//     </Router>
//   );
// }

// export default App;
