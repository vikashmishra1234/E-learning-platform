const mongoose = require("mongoose")

exports.dbConnection = async(req,res)=>{
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("db connected succefully");
    } catch (error) {
            console.log("error while connecting to db");
    }
}