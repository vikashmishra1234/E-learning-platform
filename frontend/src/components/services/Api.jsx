import axios from "axios";

// const url = "http://localhost:5000";
const url = 'https://colleges-notes-websites.onrender.com';
import Cookies from "js-cookie";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;
export const addItems = async (data) => {
  try {
    const token = Cookies.get("tokenStudentX");
    const res = await axios.post(`${url}/addfiles`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    if(error.response){
      error.response.data.error[0].path[0]&&
      toast.error("invalid type of "+error.response.data.error[0].path[0])
      throw new Error(error)
    }
  }
};
export const getItem = async (category) => {
  try {
    const res = await axios.get(`${url}/getfiles/?category=${category}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const login = async (data) => {
  try {
    const res = await axios.post(`${url}/login`, data);

    return res.data;
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.error);
      throw new Error(error);
    } else {
      toast.error(error.message);
      throw new Error(error);
    }
  }
};
export const signUp = async (data) => {
  try {
    const res = await axios.post(`${url}/signup`, data);
    return res.data;
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.error);
      throw new Error(error);
    } else {
      toast.error(error.message);
      throw new Error(error);
    }
  }
};
export const getUploadedFiles = async () => {
  try {
    const token = Cookies.get("tokenStudentX");
    const res = await axios.get(`${url}/getuploadedfiles`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteFiles = async (Id) => {
  const token = Cookies.get("tokenStudentX");
  try {
    const res = await axios.post(`${url}/deletefiles?Id=${Id}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const phoneExit = async(data)=>{
  try {
    const res = await axios.post(`${url}/phoneexit`,data);
    return res.data;
  } catch (error) {
    console.log(error.message)
  }
}
