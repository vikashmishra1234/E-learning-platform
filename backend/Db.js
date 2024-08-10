const mongoose = require("mongoose");

exports.dbConnection = async () => {
  try {
   
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {console.log("successfully connected with database");})
      .catch(() => console.log("errror while connection with database"));
      } catch (error) {
    console.log("error while connecting to db");
  }
};
