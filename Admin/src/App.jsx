// import React from 'react';
// import Navbar from './components/navbar/Navbar.jsx';
// import { Navigate } from 'react-router-dom';
// import Sidebar from './components/sidebar/Sidebar';
// import { Route, Routes } from 'react-router-dom';
// import Add from './pages/Add/Add';
// import List from './pages/list/List';
// import Order from './pages/Orders/Order';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const App = () => {
//   const url = "http://localhost:4000";

//   return (
//     <div>
//       <ToastContainer />
//       <Navbar />
//       <hr />
//       <div className="app-content">
//         <Sidebar />
//         <Routes>
//           <Route path="/" element={<Navigate to="/orders" />} />  {/* Redirect to orders or a default route */}
//           <Route path='/add' element={<Add url={url} />} />
//           <Route path='/list' element={<List url={url} />} />
//           <Route path='/orders' element={<Order url={url} />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default App;






import React from 'react';
import Navbar from './components/navbar/Navbar.jsx';
import { Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/list/List';
import Order from './pages/Orders/Order';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const url = "http://localhost:4000";

    return (
        <div>
            <ToastContainer />
            <Navbar />
            <hr />
            <div className="app-content">
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Navigate to="/orders" />} />
                    <Route path="/add" element={<Add url={url} />} />
                    <Route path="/list" element={<List url={url} />} />
                    <Route path="/orders" element={<Order url={url} />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
