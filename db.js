const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});
mongoose.set("strictQuery", false);

var mongoURL = "mongodb+srv://sagarr:1234@cluster.efxslys.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(mongoURL, {
  useNewUrlParser: true, 

useUnifiedTopology: true 
});

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("Mongo DB connection Failed");
});

connection.on("connected", () => {
  console.log("Mongo DB connection Successfull");
});

module.exports = mongoose;
