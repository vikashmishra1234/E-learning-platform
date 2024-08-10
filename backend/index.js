const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const multer = require("multer"); // For handling multipart/form-data
const fs = require("fs");
const cors = require("cors");
const { signUp, login, verifyToken } = require("./controller/auth");
const dotenv = require("dotenv");
const { handlePdf, addFiles, getFiles } = require("./controller/handlePdf");
const { dbConnection } = require("./Db");
const { userFiles, deleteFiles, phoneExit } = require("./controller/User");
const {
  validateFiles,
  userValidation,
} = require("./validations/zodValidation");
// const validate  = require('./validations/zodValidation');
dotenv.config();

const app = express();
const PORT = 5000;

// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     methods: ["POST", "GET"],
//     credentials: true,
//   })
// );
app.use(cors({
  origin:['https://colleges-notes-websites.vercel.app'],
  methods:["POST","GET"],
  credentials:true,
  optionsSuccessStatus: 200,
}));
app.use(cookieParser());
app.use(express.json());

app.post("/signup", userValidation, signUp);
// app.get('/getfiles',getFiles)
app.post("/login", login);
app.post("/addfiles", verifyToken, validateFiles, addFiles);
app.post("/deletefiles", deleteFiles);

app.get("/getuploadedfiles", verifyToken, userFiles);
app.get("/getfiles", getFiles);
app.post("/phoneexit", phoneExit);

dbConnection();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
