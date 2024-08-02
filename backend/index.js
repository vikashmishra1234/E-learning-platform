const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const multer = require('multer'); // For handling multipart/form-data
const fs = require('fs');
const cors = require('cors');
const { signUp, login, verifyToken } = require('./controller/auth');
const dotenv = require('dotenv');
const { handlePdf, addFiles, getFiles } = require('./controller/handlePdf');
const { dbConnection } = require('./Db');
const { userFiles, deleteFiles } = require('./controller/User');
dotenv.config();

const app = express();
const PORT = 5000;

// Connect to MongoDB
// app.use(cors({
//   origin:['http://localhost:5173'],
//   methods:["POST","GET"],
//   credentials:true
// }));
app.use(cors({
  origin:['https://colleges-notes-websites.vercel.app'],
  methods:["POST","GET"]
}));
app.use(cookieParser())
app.use(express.json());
dbConnection();


app.post('/signup',signUp);
// app.get('/getfiles',getFiles)
app.post('/login',login);
app.post('/addfiles',verifyToken,addFiles);
app.post('/deletefiles',verifyToken,deleteFiles);
  
app.get('/getuploadedfiles',verifyToken,userFiles);
app.get('/getfiles',getFiles);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
