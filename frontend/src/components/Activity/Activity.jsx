import React, { useState } from "react";
import { deleteFiles, getUploadedFiles } from "../services/Api";
import "./style.css";
import { MdDelete, MdBlock } from "react-icons/md";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { Link, useNavigate } from "react-router-dom";
import men from '../../assets/men.jpg';
import { Loader } from "../Loader";
import { useQuery } from '@tanstack/react-query';

const Activity = () => {
  const navigate = useNavigate();
  const [userName, setName] = useState('');

  // Redirect if token is missing
  React.useEffect(() => {
    const token = Cookies.get("tokenStudentX");
    if (!token) {
      navigate('/auth');
    }
  }, [navigate]);

  // Use React Query to fetch data
  const { data, isLoading, isError } = useQuery({
    queryKey: ['uploadedFiles'],
    queryFn: async () => {
      const res = await getUploadedFiles();
      if (res) {
        setName(res.user.data.userName); // Set the username once the data is fetched
        return res.uploadedFiles; // Assuming the files are in res.uploadedFiles
      }
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: 2, // Retry fetching the data 2 times in case of failure
  });

  const handleDelete = async (Id) => {
    try {
      const res = await deleteFiles(Id);
      if (!res) {
        toast.error("Something went wrong");
        return;
      }
      toast.success('File deleted successfully');
      // React Query handles re-fetching or cache updates, so this could also be managed differently
    } catch (error) {
      toast.error("Error deleting file");
    }
  };

  const handleLogout = () => {
    Cookies.remove("tokenStudentX");
    navigate('/auth');
  };

  if (isLoading) {
    return <Loader />; // Show a loading indicator while fetching
  }

  if (isError) {
    return <div>Error loading files.</div>; // Handle the error case
  }

  return (
    <section className="activity-section">
      <div>
        <div>
          <img src={men} alt="Profile" />
          <div>
            <div>{userName}</div>
            <div>
              <small>Files Uploaded: {data && data.length}</small>
            </div>
          </div>
        </div>
        <div className="button-profile">
          <button onClick={handleLogout}>LogOut</button>
        </div>
      </div>
      {
        data && data.length > 0 ? (
          <>
            <h2 className="activity-heading">You shared the following files.</h2>
            {data.map(file => (
              <div key={file._id} className="activity-data">
                <img
                  className="icon"
                  src="https://cdn-icons-png.flaticon.com/512/887/887997.png"
                  alt="File Icon"
                />
                <div className="subjectName">{file.subjectName}
                  <small>{file.code}</small>
                </div>
                <div>
                  <MdDelete cursor={'pointer'} onClick={() => handleDelete(file._id)} size={30} />
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="not-found">
            <MdBlock />
            <small>You haven't uploaded any files. <Link to={'/add/notes'}>Upload</Link></small>
          </div>
        )
      }
    </section>
  );
};

export default Activity;
