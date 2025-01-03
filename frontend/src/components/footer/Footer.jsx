import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'


const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footercontent">
            <div className="footercontentleft">
                <img src={assets.V4_logo} alt="" />
                <p>Chose from a diverae featuring a delectable array of dishes.our mission to satisfy your cravings and elvate your dining experience one delicious meal a day</p>
                 <div className="footersocialicons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                 </div>
            </div>
            <div className="footercontentcenter">
                       <h2>COMPANY </h2>
                       <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                       </ul>
            </div>
            <div className="footercontentright">
              <h2>Get in touch</h2>
              <ul>
                <li>+919485874385</li>
                <li>contact@tomato.com</li>
              </ul>
            </div>
        </div>
      <hr/>
      <p className="footercopywrite">
        Copyright 2024 @ tomato.com-AllRight Reserved...
      </p>
    </div>
  )
}

export default Footer
