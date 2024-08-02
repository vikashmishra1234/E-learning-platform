import React, { useState } from "react";
import { login } from "../services/Api";
import { Navigate, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const Login = ({ setShow }) => {
  const [phone, setPhone] = useState(null);
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ phone });

    if (res.token) {
      alert(res.message);

      Cookie.set("tokenStudentX", res.token, { expires: 7 });

      Navigate("/add/notes");
    }
  };
  const handleChange = (e) => {
    setPhone(e.target.value);
  };
  return (
    <div className="signup-form-container">
      <h2>Student Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            className="input"
            type="tel"
            id="phone"
            name="phone"
            onChange={handleChange}
            required
          />
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
