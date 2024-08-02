import axios from "axios";

// const url = "http://localhost:5000";
const url = 'https://colleges-notes-websites.onrender.com';

axios.defaults.withCredentials = true;
export const addItems = async (data) => {
  try {
    const res = await axios.post(`${url}/addfiles`, data);

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
  }
};
export const signUp = async (data) => {
  try {
    const res = await axios.post(`${url}/signup`, data);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const getUploadedFiles = async () => {
  try {
    const res = await axios.get(`${url}/getuploadedfiles`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteFiles = async (Id) => {
  try {
    const res = await axios.post(`${url}/deletefiles?Id=${Id}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};


