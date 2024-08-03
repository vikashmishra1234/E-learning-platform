import axios from "axios";

// const url = "http://localhost:5000";
const url = 'https://colleges-notes-websites.onrender.com';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true;
export const addItems = async (data) => {
  try {
    const token = Cookies.get("tokenStudentX")
    const res = await axios.post(`${url}/addfiles`, data,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });

    return res.data;
  } catch (error) {
    alert(error.message);
    console.log(error.message);
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
    console.log(error.message);
    alert(error.message)
  }
};
export const signUp = async (data) => {
  try {
    const res = await axios.post(`${url}/signup`, data);
    return res.data;
  } catch (error) {
    console.log(error.message);
    alert(error.message)
  }
};
export const getUploadedFiles = async () => {

  try {
    const token = Cookies.get("tokenStudentX")
    const res = await axios.get(`${url}/getuploadedfiles`,{
      headers:{
        Authorization:`bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteFiles = async (Id) => {
  const token = Cookies.get("tokenStudentX")
  try {
    const res = await axios.post(`${url}/deletefiles?Id=${Id}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};


