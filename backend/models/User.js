const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    studentYear:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
const User = mongoose.model('User',userSchema);
module.exports = User;