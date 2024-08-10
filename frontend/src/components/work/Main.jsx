import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { getItem } from "../services/Api";
import { MdOutlineDoNotDisturb } from "react-icons/md";
import pdfImg from '../../assets/pdf.png'
import "./style.css";
import { Loader } from "../Loader";

const Main = () => {
  const [query, setQuery] = useState(null);
  const [pdfData, setPdfData] = useState([]);
  const [active, setActive] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  
  const location = useLocation();

  const getQuery = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParamValue = searchParams.get("q");
    setQuery(queryParamValue);
  }, [location.search]);

  const getData = useCallback(async () => {
    if (!query) return;
    setIsLoading(true);
    try {
      const res = await getItem(query);
      setPdfData(res.files || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    if (!query) {
      getQuery();
    } else {
      getData();
    }
  }, [query, getQuery, getData]);

  const filteredData = useMemo(() => {
    if (active === "All") return pdfData;
    return pdfData.filter((data) => {
      if (!data.year) return false;
      const dataYear = typeof data.year === 'string' ? parseInt(data.year, 10) : data.year;
      return dataYear === parseInt(active, 10);
    });
  }, [pdfData, active]);

  const handleSort = useCallback((val) => {
    setActive(val);
  }, []);

  const renderContent = () => {
    if (isLoading) return <Loader />;
    if (filteredData.length === 0) {
      return (
        <div style={{gap:'5px', display:'flex', alignItems:'center'}}>
          <MdOutlineDoNotDisturb size={29} />
          <h2>Not Found</h2>
        </div>
      );
    }
    return filteredData.map((item, index) => (
      <div key={index} className="card">
        <div className="badge">{item.category}</div>
        <img src={pdfImg} alt="PDF icon" />
        <div className="card-body">
          <h2>{item.code}</h2>
          <p>{item.subjectName}</p>
          <a href={item.file} download={`${item.code}.pdf`}>Download</a>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className="top">
        <h1>{query}</h1>
        <ul>
          {["All", "1", "2", "3", "4"].map((val) => (
            <li
              key={val}
              className={active === val ? 'active' : ''}
              onClick={() => handleSort(val)}
            >
              {val}
            </li>
          ))}
        </ul>
      </div>
      <section className="card-container">
        {renderContent()}
      </section>
    </div>
  );
};

export default Main;