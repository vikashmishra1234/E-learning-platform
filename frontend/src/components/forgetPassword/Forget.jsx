import {  signInWithPhoneNumber } from 'firebase/auth';
import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import { RecaptchaVerifier } from 'firebase/auth';

import { Navigate, useNavigate } from 'react-router-dom';
import { login, phoneExit } from '../services/Api';
import { auth } from './firebase';


const Forget = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(null);
  const [user, setUser] = useState(null);
  const [isSend, setSend] = useState(false);
  const [loading,setLoading] = useState(false);
  const [isSent,setSent] = useState(false)
  const Navigate = useNavigate();
  const sendOtp = async () => {
    try {
      const res = await phoneExit({phone});
      if (!res || !res.success) {
        alert("Phone number does not exist");
        return;
      }
      
      const phoneNumber = '+' + phone;
      console.log(phoneNumber);
      const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {});
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
      
      setUser(confirmation);
      alert("OTP has been sent successfully");
      setSent(true);
      setSend(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };
const verfiyOtp=async()=>{
  try {
    
    const data = await user.confirm(otp);
    if(data.user.phoneNumber){
      const phones = phone.slice(2,);
      const res = await login({Phone:phones});
      localStorage.setItem("priestToken",res.token)
      Navigate('/register/user');
      alert(res.message)
    }
    
  } catch (error) {
    alert(error.message)
    console.log(error.message);
  }

}
  return (
    <div>
      {
        // loading&&<Loading/>
      }
      <PhoneInput
        country={'in'}
        value={phone}
        onChange={(value) => setPhone(value)}
      />
      <div id='recaptcha'></div>
    <div>
<button disabled={isSent} onClick={sendOtp}>sendOtp</button>
    </div>

  { isSend&&<div>
      <input type="phone" onChange={(e)=>setOtp(e.target.value)} />
    <div>
      <button onClick={verfiyOtp}>verfiyOtp</button>
    </div>
    </div>}

    </div>
  )
}

export default Forget