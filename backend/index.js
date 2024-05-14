const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer'); // For handling multipart/form-data
const fs = require('fs');
const cors = require('cors');
const { signUp, login, verifyToken } = require('./auth');

const app = express();
const PORT = 5000;

// Connect to MongoDB
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb+srv://vikashmishra8371:raXxlY7Qxp9RITrb@cluster0.ouwkxt4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define schema for PDF files
const pdfSchema = new mongoose.Schema({
  name: String,
  code:String,
  category:String,
  subjectName:String,
  year:String,
  userId:String
  
});

// Create a model based on the schema
const PdfModel = mongoose.model('Pdf', pdfSchema);

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
   
    cb(null, '../frontend/uploads/');
  },
  filename: (req, file, cb) => {
   
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Endpoint for file upload
app.post('/signup',signUp);
app.post('/login',login);
app.post('/add/item',verifyToken, upload.single('file'), async (req, res) => {
    try {
       
      const { originalname } = req.file;

      const newPdf = new PdfModel({
          name: originalname,
        code:req.body.code,
        category:req.body.category,
        subjectName:req.body.subjectName,
        year:req.body.year,
        userId:req.user.user_id
        });
       
        await newPdf.save();
       
  
     
  
      res.status(200).send('File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error.message);
      res.status(500).send('Error uploading file.');
    }
  });
  
app.get('/get/item', async (req, res) => {
    try {
       
        const category = req.query.category;
   console.log(category)
      const pdf = await PdfModel.find({category:category});
      
    console.log(pdf)
      if (pdf.length===0) {
        return res.status(404).send('PDF not found');
      }
  
      // Send the PDF file data as response
      res.contentType('application/pdf');
      res.json({pdf:pdf});
     
    } catch (error) {
      console.error('Error fetching PDF:', error);
      res.status(500).send('Error fetching PDF');
    }
  });
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
