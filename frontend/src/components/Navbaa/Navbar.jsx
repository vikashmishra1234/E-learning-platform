import React, { useState } from "react";
import "./style.css";
import { GiHamburgerMenu } from "react-icons/gi";
import {Link} from 'react-router-dom'
const Navbar = () => {
    const [show,setShow] = useState(false);
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src="src/assets/study2.webp" alt="img" />
        <div>StudentX</div>
      </div>
      <ul>
        <GiHamburgerMenu className="ham" onClick={()=>setShow(!show)} color="white" size={28} />
       <div className="ul-item">
          <li onClick={()=>setShow(false)}><Link to='/'>Home</Link></li>
          <li onClick={()=>setShow(false)}>Contact</li>
        </div>
       { show&&<div className="li-item">
          <li onClick={()=>setShow(false)}><Link to='/'>Home</Link></li>
          <li onClick={()=>setShow(false)}>Contact</li>
        </div>}
      </ul>
    </nav>
  );
};

export default Navbar;
