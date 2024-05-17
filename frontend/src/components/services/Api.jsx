import axios from "axios"

// const url = 'http://localhost:5000'
const url = 'https://colleges-notes-websites.onrender.com';


export const addItems = async(data)=>{
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization':`bearer ${localStorage.getItem('token')}`
          },
    }
    try {
        const res = await axios.post(`${url}/add/item`,data,config
           
        );
       
        return res.data;
    } catch (error) {
        alert(error.message)
        console.log(error.message);
    }
}
export const getItem = async(category)=>{
    try {
        const res = await axios.get(`${url}/get/item/?category=${category}`);
        return res.data;
    } catch (error) {
        console.log(error.message);
    }
}
export const login = async(data)=>{
    try {
        const res = await axios.post(`${url}/login`,data);
       
        return res.data;
    } catch (error) {
        console.log(error.message);
    }
}
export const signUp = async(data)=>{
    try {
        const res = await axios.post(`${url}/signup`,data);
        return res.data;
    } catch (error) {
        console.log(error.message);
    }
}