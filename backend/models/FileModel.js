const mongoose = require('mongoose');

// Define schema fields
const fileSchemaFields = {
    file: {
        type: String,
        required: [true, 'File path is required'],
        trim: true
    },
    code: {
        type: String,
        required: [true, 'Code is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],

        trim: true
    },
    subjectName: {
        type: String,
        required: [true, 'Subject name is required'],
        trim: true
    },
    year: {
        type: String,
        required: [true, 'Year is required'],
      
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User ID is required'],
        ref: 'User'
    }
};


const fileSchema = new mongoose.Schema(fileSchemaFields, {
    timestamps: true 
});


const FileModel = mongoose.model('File', fileSchema);

module.exports = FileModel;
