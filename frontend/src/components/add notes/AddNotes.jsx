import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Cookies from 'js-cookie'
import { addItems } from "../services/Api";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Loader } from "../Loader";
import { NotesValidation } from "../auth/Validation";
import axios from "axios";
import Auth from "../auth/Auth";
import { toast } from "react-toastify";

const AddNotes = () => {
  const [loader, setLoader] = useState(false);
  const [authToken,setToken] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    const token = Cookies.get('tokenStudentX');
    setToken(token);
    
  },[Cookies.get('tokenStudentX')])
 

  const formik = useFormik({
    initialValues: {
      code: "",
      year: "",
      subjectName: "",
      category: "",
      file: null,
    },
    validationSchema: NotesValidation,
    onSubmit: async (values) => {
      setLoader(true);
      try {
        
        const res = await addItems(values);
        if(!res){
          toast.error("Something Went wrong");
          return
        }
        toast.success(res);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setLoader(false);
      }
    },
  });

  return (
    
   <form onSubmit={formik.handleSubmit} className="form-container">
      {loader && <Loader />}
      <h2 style={{ textAlign: "center" }}>Add Notes</h2>
      <div className="input-field">
        <label htmlFor="code">Subject Code</label>
        <input
          type="text"
          id="code"
          placeholder="Enter value"
          {...formik.getFieldProps("code")}
          onBlur={formik.handleBlur}
        />
        {formik.touched.code && formik.errors.code ? (
          <div>{formik.errors.code}</div>
        ) : null}
      </div>
      <div className="input-field">
        <label htmlFor="year">Year</label>
        <input
          type="number"
          id="year"
          placeholder="Enter value"
          {...formik.getFieldProps("year")}
          onBlur={formik.handleBlur}
        />
        {formik.touched.year && formik.errors.year ? (
          <div>{formik.errors.year}</div>
        ) : null}
      </div>
      <div className="input-field">
        <label htmlFor="subjectName">Subject Name</label>
        <input
          type="text"
          id="subjectName"
          placeholder="Subject name"
          {...formik.getFieldProps("subjectName")}
          onBlur={formik.handleBlur}
        />
        {formik.touched.subjectName && formik.errors.subjectName ? (
          <div>{formik.errors.subjectName}</div>
        ) : null}
      </div>
      <div className="input-field">
        <select
          id="category"
          {...formik.getFieldProps("category")}
          onBlur={formik.handleBlur}
        >
          <option value="">Select Category</option>
          <option value="previousyear">Previous Year</option>
          <option value="notes">Notes</option>
          <option value="quantum">Quantum</option>
        </select>
        {formik.touched.category && formik.errors.category ? (
          <div>{formik.errors.category}</div>
        ) : null}
      </div>
      <div className="file-input">
        <label htmlFor="pdf">Choose the file</label>
        <input
          type="file"
          id="pdf"
          onChange={async (e) => {

            try {
              const formData = new FormData();
              formData.append("file", e.target.files[0]);
              formData.append("upload_preset", "instaclone");
              setLoader(true)
              const res = await fetch('https://api.cloudinary.com/v1_1/vikashcloud/raw/upload',{
                method:"POST",
                body:formData
              });
              const data = await res.json();
            
              setLoader(false)
            
              formik.setFieldValue("file", data.secure_url);
            } catch (error) {
              alert(error.message);
            }
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.file && formik.errors.file ? (
          <div>{formik.errors.file}</div>
        ) : null}
      </div>
      <div className="submit-button">
        <button type="submit" disabled={formik.isSubmitting}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddNotes;
