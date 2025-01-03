import React, { useContext, useState } from 'react';
import { Storecontext } from '../../context/Storecontext';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setshowLogin }) => {
    const [menu, setmenu] = useState("menu");
    const { getTotalCartamount, token, settoken } = useContext(Storecontext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        settoken("");
        navigate("/home");
    };

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.V4_logo} alt="Logo" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setmenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
                <a href='#exploremenu' onClick={() => setmenu("Menu")} className={menu === "Menu" ? "active" : ""}>Menu</a>
                <a href='#appdownload' onClick={() => setmenu("Mobile-app")} className={menu === "Mobile-app" ? "active" : ""}>Mobile-app</a>
                <a href='#footer' onClick={() => setmenu("Contact-us")} className={menu === "Contact-us" ? "active" : ""}>Contact-Us</a>
            </ul>

            <div className="navbar-right">
                <div className="navbar-search-icon">
                    <Link to="/cart"><img src={assets.basket_icon} alt="Cart" /></Link>
                    <div className={getTotalCartamount() === 0 ? "" : "dot"} />
                </div>

                {!token ? (
                    <button onClick={() => setshowLogin(true)}>Sign in</button>
                ) : (
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="Profile" />
                        <ul className="navbarprofiledropdown">
                            <li onClick={() => navigate('/myorders')}>
                                <img src={assets.bag_icon} alt="Orders" />
                                <p>Orders</p>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="Logout" />
                                <p>Logout</p>
                            </li>
                            <hr />
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
