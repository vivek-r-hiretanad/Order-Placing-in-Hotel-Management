import React from 'react'
import './appdownload.css'
import { assets } from '../../assets/assets'
const Appdownload = () => {
  return (
    <div className='appdownload' id='appdownload'>
             <p>Better Experience Download <br/> Tomato App</p>      
             <div className="appdownloadplatforms">
                <img src={assets.play_store} alt="" />
                <img src={assets.app_store} alt="" />
             </div>
    </div>
  )
}

export default Appdownload
