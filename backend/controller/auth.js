const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name:String,
    phone:String,
    year:String
});
const User = mongoose.model('user',userSchema);

exports.login=async(req,res)=>{
    try {
    
        const user = await User.findOne({phone:req.body.phone});
        
        if(!user){
            return res.status(401).send("Please Sign Up");
        }
        const data={
            user_id:user._id,
            userName:user.name
        }
        const token=jwt.sign({
           data
          }, 'secret', { expiresIn: '96h' });

       return res.status(200).json({token:token,message:'Login Successful'});
    } catch (error) {
        res.status(500).send(error.message);
        
    }
}
exports.signUp=async(req,res)=>{
    try {
        const user = await User.findOne({phone:req.body.phone});
        if(user){
            return res.status(403).send("user already exist");
        }
       
    const newUser = new User(req.body);
    const data={
        user_id:newUser._id,
        userName:newUser.name
    }
    const token=jwt.sign({
       data
      }, 'secret', { expiresIn: '96h' });
    
    await newUser.save();
    return res.status(200).json({token:token,message:'sign up successful'});
        
    } catch (error) {
       return res.status(500).send(error.message);
    }
}

exports.verifyToken=async(req,res,next)=>{
   
        // Get the token from the request headers
        console.log(req.cookies)
        const token = req.cookies.tokenStudentX;
     
        if (!token) {
          
          return res.status(402).json({ error: 'Missing token' });
        }
      
        try {
          // Verify the token using the secret key
          const decoded = jwt.verify(token,'secret' );
      
          // Add the decoded payload to the request object
         
          req.user = decoded;
    
          next();
        } catch (err) {
          if (err.name === 'TokenExpiredError') {
            return res.send("something went wrong.");
          } else if (err.name === 'JsonWebTokenError') {
            return res.status(403).json({ error: 'Invalid token' });
          } else {
            return res.status(401).json({ error: 'Invalid token' });
          }
        }
      };
