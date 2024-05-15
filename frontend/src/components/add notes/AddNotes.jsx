import React, { useEffect, useState } from "react";
import { addItems } from "../services/Api";
import { Navigate, useNavigate } from "react-router-dom";
import './style.css'
import { Loader } from "../Loader";
const AddNotes = () => {
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState();
  const [subjectName, setSubject] = useState();
  const [data, setData] = useState("");
  const [loader,setLoader] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("token") ? "" : Navigate("/auth");
  });
  const handleFile = (e) => {
    setData(e.target.files[0]);
    // setItemDetail({...itemDetail,data:formData});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", data);
    formData.append("code", code);
    formData.append("category", category);
    formData.append("subjectName", subjectName);
    formData.append("year", year);
    setLoader(true)
    const res = await addItems(formData);
    setLoader(false);
    alert(res)
  };
  return (
    <form action="" onSubmit={handleSubmit} className="form-container">
      {
        loader&&<Loader/>
      }
      <h2 style={{textAlign:'center'}}>Add Notes</h2>
      <div className="input-field">
        <label htmlFor="code">Subject Code</label>
        <input
        required
          type="text"
          onChange={(e) => {
            setCode(e.target.value);
          }}
          name="subjectCode"
          id="code"
          placeholder="enter value"
        />
      </div>
      <div className="input-field">
        <label htmlFor="year">Year</label>
        <input
        required
          onChange={(e) => {
            setYear(e.target.value);
          }}
          type="number"
          placeholder="enter value"
          id="year"
        />
      </div>
      <div className="input-field">
        <label htmlFor="subjectName">Subject Name</label>
        <input
        required
          onChange={(e) => {
            setSubject(e.target.value);
          }}
          type="text"
          name=""
          id="subjectName"
          placeholder='subject name'
        />
      </div>
      <div className="input-field">
        <select
        required
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          name="category"
          id="category"
        >
          <option value="previousyear">Previos Year</option>
          <option value="notes">Notes</option>
          <option value="quantum">Quantum</option>
        </select>
      </div>
      <div className="file-input">
        <label htmlFor="pdf">Choose the file</label>
        <input required onChange={handleFile} type="file" id="pdf" />
        
      </div>
      <div className="submit-button">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AddNotes;
