import React from 'react'
import './Exploremenu.css'
import { menu_list } from '../../assets/assets'
const Exploremenu = ({category,setcategory}) => {
  return (
    <div className='exploremenu' id="exploremenu">
        <h1>Explore our menu</h1>
        <p className='exploremenutext'>Chose from a diverae featuring a delectable array of dishes.our mission to satisfy your cravings and elvate your dining experience one delicious meal a day</p>
        <div className='exploremenulist'>
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setcategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="exploremenulistitem">
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
      <hr />
    </div>
  )
}

export default Exploremenu
