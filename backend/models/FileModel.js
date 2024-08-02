const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema({
    file: String,
    code:String,
    category:String,
    subjectName:String,
    year:String,
    userId:String
    
  });
  
  // Create a model based on the schema
  const FileModel = mongoose.model('Pdf', fileSchema);

  module.exports = FileModel
  