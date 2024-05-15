import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getItem } from "../services/Api";
import { MdOutlineDoNotDisturb } from "react-icons/md";

import "./style.css";
import { Loader } from "../Loader";

const Main = () => {
  const [query, setQuery] = useState(null);
  const [pdf, setPdf] = useState([]);
  const [pdfData, setPdfData] = useState([]);
  const [filteredData,setFilter] = useState(null);
  const [change,setChange] = useState(false);
  const [active,setActive] = useState("All");
  const [loader,setLoader] = useState(false);
  
  const location = useLocation();

  
  const getQuery = () => {
    const searchParams = new URLSearchParams(location.search);
    const queryParamValue = searchParams.get("q");
    setQuery(queryParamValue);
  };

  const getData = async () => {
    setLoader(true);
    const res = await getItem(query);
    setLoader(false)
    if(res&&res.pdf){

      setPdf(res.pdf);
    }
  };

  useEffect(() => {
    !query && getQuery();
    query && getData();
  }, [query]);

  useEffect(() => {
    const fetchPdfData = async () => {
      const pdfDataPromises = pdf.map(async (item) => {
        setLoader(true)
        const response = await fetch(
          `https://colleges-notes-websites.vercel.app/uploads/${item.name}`
        );
     
        const data = await response.blob();
        setLoader(false)
        return { ...item, data };
      });
      setLoader(true)
      const resolvedPdfData = await Promise.all(pdfDataPromises);
      setLoader(false)
      setPdfData(resolvedPdfData);
    };

    if (pdf.length > 0) {
      fetchPdfData();
      
    }
  }, [pdf]);
  useEffect(()=>{
    setFilter(pdfData)
  },[pdfData,change])
const handleSort=(val)=>{
  const filteredData = pdfData.filter((data)=> {return data.year&&data.year==val});
  setActive(val)
 setFilter(filteredData)
}
  return (
    <div style={{ paddingTop: "20px" }}>
      {
        loader&&<Loader/>
      }
      <div className="top">
        <h1>{query}</h1>
        <ul>
          <li className={active=='All'?'active':''} onClick={()=>{setChange(!change);setActive("All")}}>All</li>
          <li className={active=='1'?'active':''} onClick={()=>handleSort(1)}>1</li>
          <li className={active=='2'?'active':''}  onClick={()=>handleSort(2)} >2</li>
          <li className={active=='3'?'active':''}  onClick={()=>handleSort(3)} >3</li>
          <li className={active=='4'?'active':''} onClick={()=>handleSort(4)} >4</li>
        </ul>
      </div>
      <section className="card-container">
      {
        filteredData&&filteredData.length===0&&<div style={{gap:'5px',display:'flex',alignItems:'center'}}>
          <div>
          <MdOutlineDoNotDisturb size={29} />
          </div>
            <h2>Not Found</h2>
        </div>
      }
        {filteredData&&filteredData.map((item, index) => (
          <div key={index} className="card">
            <div className="badge">{item.category}</div>
            <img src="https://colleges-notes-websites.vercel.app/assets/pdf.png" alt="img" />

            <div className="card-body">
              <h2>{item.code}</h2>
              <p>{item.subjectName}</p>

              <a
                href={URL.createObjectURL(item.data)}
                download={`file_${index}.pdf`}
                className="btn btn-primary"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </section>
 {   active=='All'&&<div style={{margin:'auto',width:'fit-content',paddingTop:'10px'}}>
        <Link style={{
         borderRadius:'5px',
          fontSize:'22px',
          fontWeight:'bold',
          padding:'10px',
          background:'black',
          color:'white',
          textDecoration:'none',
          
        }} to={'/add/notes'}>AddNotes</Link>
      </div>}
    </div>
  );
};

export default Main;
