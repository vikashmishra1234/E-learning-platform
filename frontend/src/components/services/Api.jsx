import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// const BASE_URL = "http://localhost:5000";
const BASE_URL = 'https://colleges-notes-websites.onrender.com';
axios.defaults.withCredentials = true;

const handleRequestError = (error) => {
  if (error.response) {
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
    return;
  } else {
    toast.error("Something went wrong");
    return;
  }
  throw new Error(error);
};

const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor to dynamically set the token
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("tokenStudentX");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Your API methods remain the same
export const addItems = async (data) => {
  try {
    const res = await apiClient.post("/addfiles", data);
    return res.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getItem = async (category) => {
  try {
    const res = await apiClient.get(`/getfiles`, { params: { category } });
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const login = async (data) => {
  try {
    const res = await apiClient.post("/login", data);
    return res.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const signUp = async (data) => {
  try {
    const res = await apiClient.post("/signup", data);
    return res.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getUploadedFiles = async () => {
  try {
    const res = await apiClient.get("/getuploadedfiles");
    return res.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const deleteFiles = async (Id) => {
  try {
    const res = await apiClient.post(`/deletefiles`, null, { params: { Id } });
    return res.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const phoneExit = async (data) => {
  try {
    const res = await apiClient.post("/phoneexit", data);
    return res.data;
  } catch (error) {
    handleRequestError(error);
  }
};
