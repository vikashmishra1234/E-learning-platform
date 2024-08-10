import React from 'react'
import './style.css'
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
<>
    <footer className='footer'>
<div className='footer-first'>
    <div className='icons'>
        <div className='icon'>
<a href="https://x.com/VikashMish23321?t=W_vUKpmWLecypC9655InHQ&s=09"><FaXTwitter color='black' /></a>
    
        </div>
        <div className='icon'>
<a href="https://wa.me/8979481819"><FaWhatsapp color='green' /></a>
    
        </div>
        <div className='icon'>
<a href="https://www.instagram.com/v.i.k.a.s.h.123?igsh=MWNsNWFxY25od3puMg=="> <FaInstagram color=' #e1306c'  /></a>
   
        </div>
        <div className='icon'>

    <a href="https://www.linkedin.com/in/vikash-mishra-099478277?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FaLinkedin color='blue' /></a>
        </div>
    </div>
    <div className="menus ">
        <ul className='uls'>
            <li><Link to={'/'}>Home</Link></li>
            <li><a href='/activity'>Activity</a></li>
            <li><a href='/add/notes'>Share Files</a></li>
            <li><a href={'#contact'}>Contact</a></li>
        </ul>
    </div>
</div>
<div className='footer-second'>
<h3>Contact Us:</h3>
<div className='info'>
    <a href="mailto:vikashmishra8371@gmail.com"><MdEmail size={25}/>vikashmishra8371@gmail.com</a>
    <a href="tel:+91 8979481819"><FaPhone size={22}/>+91 8979481819</a>
    <p><FaLocationArrow  size={25}/>Mathura,Uttar Pradesh India.</p>
</div>
</div>
    </footer>
<div className='copyright'>
    <h3>copyright@2024-vikashmishra.com</h3>
</div>
</>
  )
}

export default Footer