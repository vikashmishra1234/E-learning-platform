import React, { useState } from 'react'
import SignUpForm from './SignUp'
import Login from './Login'

const Auth = () => {
const [show,setShow] = useState(false);
  return (
    <>
    {
        !show?<Login setShow={setShow}/>:<SignUpForm setShow={setShow}/>
    }
    
    
    </>
  )
}

export default Auth