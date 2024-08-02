import React, { useEffect, useState } from "react";
import { deleteFiles, getUploadedFiles } from "../services/Api";
import "./style.css";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
const Activity = () => {
  const [files, setFiles] = useState("");
  const [userName,setName] = useState('');
  const notifyA = () => toast.success("Deleted Successfully");
  const notifyB = () => toast.error("Something went wrong");
  const getData = async () => {
      
    const data = await getUploadedFiles();
    setName(data.user.data.userName)
    setFiles(data.uploadedFiles);
  };
  useEffect(() => {
    getData();
  }, []);
  const handleDelete = async (Id) => {
    
     const res = await deleteFiles(Id);
     if(!res){
        toast.error("something went wrong");
        return;
     }
      toast.success('File deleted successfully');
      getData()

    
  };
  return (
    <section className="activity-section">
      <div>
        <div>
          <img src="/src/assets/men.jpg" alt="" />
          <div>
            <div>{userName}</div>
            <div>
              {" "}
              <small>FilesUploaded: {files&&files.length}</small>
            </div>
          </div>
        </div>
        <div className="button-profile">
          <button>Edit Profile</button>
        </div>
      </div>
      <h2 className="activity-heading">you shared the following files.</h2>
      {
        files&&files.length>0?files.map(file=>(
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
              <MdDelete cursor={'pointer'} onClick={()=>handleDelete(file._id)} size={30} />
            </div>
          </div>
        )):<small>you hav'nt upload any file.</small>
      }
    </section>
  );
};

export default Activity;
