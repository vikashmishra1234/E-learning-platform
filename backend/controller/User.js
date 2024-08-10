const FileModel = require("../models/FileModel");
const User = require("../models/User");

exports.userFiles = async(req,res)=>{
    try {
        const userId =req.user.data.user_id;
        
       if(!userId){
        return res.status(409).json({
            message:'please provide credentials',
            success:false
        })
       }
      
        const uploadedFiles = await FileModel.find({userId:userId});
       
        if(!uploadedFiles){
            return res.status(409).json({
                success:false,
                message:"Something went wrong"
            });
        }
        return res.status(200).json({
            success:true,
            message:'files found',
            uploadedFiles,
            user:req.user
        });
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error:error.message,
            message:"Something Went Wrong"

        });
    }
}

exports.deleteFiles = async(req,res)=>{
    try {
        
        const {Id} = req.query;
       
        const remove = await FileModel.deleteOne({_id:Id});
        if(!remove.acknowledged){
            return res.status(409).json({
                success:false,
                message:'can not delete'
            })
        }
        return res.status(200).json({
            message:"delete successfully",
            success:true
        })
    } catch (error) {
       
        return res.status(500).json({
            success:false,
            message:'can not delete'
        })
    }
}
exports.phoneExit = async(req,res)=>{
    try {
        if(!req.body.phone){
            return res.status(404).json({
                success:false,
                error:'enter all credentials'
            })
        }
        req.body.phone = req.body.phone.slice(2);
        const phone = await User.findOne({phone:req.body.phone});
        if(!phone){
            return res.status(404).json({
                success:false,
                error:"user not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:'user found'
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:"something went wrong"
        })
    }
}