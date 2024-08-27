const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.body.phone });

    if (!user) {
      return res.status(401).json({
        success:false,
        error:"User Not Found"
      });
    }
    if(!req.body.otp){

      const match = bcrypt.compareSync(req.body.password, user.password);
      if (!match) {
        return res.status(404).json({
          success: false,
          error: "Invalid Password",
        });
      }
    }
    
    const data = {
      user_id: user._id,
      userName: user.name,
    };
    const token = jwt.sign(
      {
        data,
      },
      process.env.JWT_SECRETE
    );

    return res.status(200).json({ token: token, message: "Login Successful" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};
exports.signUp = async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.body.phone });
    if (user) {
      return res.status(403).json({
        success:false,
        error:'user already exits'
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashPass;
    const newUser = new User(req.body);

    const data = {
      user_id: newUser._id,
      userName: newUser.name,
    };
    const token = jwt.sign(
      {
        data,
      },
      process.env.JWT_SECRETE,
      { expiresIn: "96h" }
    );

    await newUser.save();
    return res
      .status(200)
      .json({ token: token, message: "sign up successful" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success:false,
      error:"Something Went Wrong"
    });
  }
};


exports.verifyToken = async (req, res, next) => {
  // Get the token from the request headers

  try {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];
  

    if (token == null) return res.sendStatus(401); // Unauthorized

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRETE);

    // Add the decoded payload to the request object

    req.user = decoded;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.json({error:"something went wrong."});
    } else if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ error: "Invalid token" });
    } else {
      return res.status(401).json({ error: "Invalid token" });
    }
  }
};
