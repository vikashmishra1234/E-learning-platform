import React from 'react';
import './style.css';
import { signUp } from '../services/Api';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignUpForm = ({ setShow }) => {
  const navigate = useNavigate();

  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().min(3).required('Name is required'),
    studentYear: Yup.number()
    .required('Student Year is required')
    .integer('Student Year must be an integer')
    .positive('Student Year must be a positive number')
    .test(
      'len',
      'Student Year must be a single digit',
      val => val && val.toString().length === 1
    ),
    phone: Yup.string()
      .required('Phone Number is required')
      .matches(/^\d{10}$/, 'Invalid phone number'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: '',
      studentYear: '',
      phone: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const res = await signUp(values);
      alert(res.message);
      localStorage.setItem('token', res.token);
      navigate('/add/notes');
    },
  });
console.log(formik)
  return (
    <div className="signup-form-container">
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
          {formik.touched.name&&formik.errors.name && <div style={{color:"red"}}>{formik.errors.name}</div>}
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
          {formik.touched.studentYear&&formik.errors.studentYear && <div style={{color:"red"}}>{formik.errors.studentYear}</div>}
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
          {formik.touched.phone&&formik.errors.phone && <div style={{color:"red"}}>{formik.errors.phone}</div>}
        </div>
        <button className="btn" type="submit">
          Sign Up
        </button>
      </form>
      <div>
        <button
          style={{ marginTop: '8px', cursor: 'pointer', width: '100%', height: '25px' }}
          onClick={() => setShow(false)}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;