import React, { useState } from "react";
import { login } from "../services/Api";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { toast } from "react-toastify";

const Login = ({ setShow }) => {
 const [formData,setFormData] = useState({});
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const res = await login(formData);

    if (res&&res.token) {
      toast.success(res.message)

      Cookie.set("tokenStudentX", res.token,{ secure: true, sameSite: 'Strict' }, { expires: 7 });

      Navigate("/add/notes");
    }
  };
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})

  };
  return (
    <div className="signup-form-container">
      <h2>Student Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
          placeholder="Enter Phone"
            className="input"
            type="tel"
            id="phone"
            name="phone"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
          placeholder="Enter Password"
            className="input"
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Link to={'/forgetpassword'} >forget password ?</Link>
        </div>
        <button className="btn" type="submit">
          Login
        </button>
      </form>
      <div>
        <button
          style={{
            marginTop: "8px",
            cursor: "pointer",
            width: "100%",
            height: "25px",
          }}
          onClick={() => {
            setShow(true);
          }}
        >
          SignUp
        </button>
      </div>
    </div>
  );
};

export default Login;
