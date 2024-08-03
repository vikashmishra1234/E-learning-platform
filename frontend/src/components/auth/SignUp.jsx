import React, { useState } from "react";
import "./style.css";
import { signUp } from "../services/Api";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Cookie from "js-cookie";
import { Loader } from "../Loader";
import { signUpValidate } from "./Validation";

const SignUpForm = ({ setShow }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      studentYear: "",
      phone: "",
    },
    validationSchema: signUpValidate,
    onSubmit: async (values) => {
      setLoader(true);
      const res = await signUp(values);
      setLoader(false);
      alert(res.message);
      Cookie.set("tokenStudentX", res.token, { 
        secure: true,
        domain: 'colleges-notes-websites.vercel.app', 
        sameSite: 'Strict',
        expires: 7 // 7 days from now
      });
      navigate("/add/notes");
    },
  });
 
  return (
    <div className="signup-form-container">
      {loader && <Loader />}
      <h2>Student Sign Up</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            onBlur={formik.handleBlur}
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name && (
            <div style={{ color: "red" }}>{formik.errors.name}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="studentYear">Student Year:</label>
          <input
            className="input"
            type="text"
            id="studentYear"
            name="studentYear"
            onBlur={formik.handleBlur}
            value={formik.values.studentYear}
            onChange={formik.handleChange}
          />
          {formik.touched.studentYear && formik.errors.studentYear && (
            <div style={{ color: "red" }}>{formik.errors.studentYear}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            className="input"
            type="tel"
            id="phone"
            name="phone"
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div style={{ color: "red" }}>{formik.errors.phone}</div>
          )}
        </div>
        <button className="btn" type="submit">
          Sign Up
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
          onClick={() => setShow(false)}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
