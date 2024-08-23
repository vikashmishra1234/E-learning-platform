import React from "react";
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

  const [userName, setName] = React.useState('');
  // Fetch uploaded files using useQuery
  const { data, isLoading,isError } = useQuery({
    queryKey: ['uploadedFiles'],
    queryFn: getUploadedFiles,
    enabled:true,
    onSuccess: (data) => {
      setName(data.user.data.userName);
    },
    onError: () => {
      toast.error("Failed to fetch your activitis");
    },
    
  });

  // Redirect if token is not found
  React.useEffect(() => {
    const token = Cookies.get("tokenStudentX");
   
    data&&setName(data.user.data.userName);
    if (!token) {
      navigate('/auth');
    }
  }, [navigate,data]);

  // Handle file deletion
  const handleDelete = async (Id) => {
    try {
      const res = await deleteFiles(Id);
      if (!res) {
        toast.error("Something went wrong");
        return;
      }
      toast.success('File deleted successfully');
    } catch (error) {
      toast.error("Error deleting file");
    }
  };

  // Handle logout
  const handleLogout = () => {
    Cookies.remove("tokenStudentX");
    navigate('/auth');
  };

  if (isLoading) {
    return <Loader />;
  }
 
  return (
    <section className="activity-section">
      <div>
        <div>
          <img src={men} alt="" />
          <div>
            <div>{userName}</div>
            <div>
              <small>Files Uploaded: {data?.uploadedFiles.length}</small>
            </div>
          </div>
        </div>
        <div className="button-profile">
          <button onClick={handleLogout}>LogOut</button>
        </div>
      </div>
      {
        data?.uploadedFiles.length > 0 ? (
          <>
            <h2 className="activity-heading">You shared the following files.</h2>
            {data.uploadedFiles.map(file => (
              <div key={file._id} className="activity-data">
                <img
                  className="icon"
                  src="https://cdn-icons-png.flaticon.com/512/887/887997.png"
                  alt=""
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
