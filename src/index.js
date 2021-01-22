const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();

dotenv.config();

// Connect to DB
const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
mongoose.connect(process.env.DB_STRING, options);

mongoose.connection.on('connected', function () {
    console.log('Database connection established!');
  }); 
  
  mongoose.connection.on('error',function (err) { 
    console.log('Database connection connection error: ' + err);
  }); 
  
  mongoose.connection.on('disconnected', function () { 
    console.log('Database disconnected'); 
  });

  // Safe exit on Node process crash
process.on('SIGINT', function() {   
    mongoose.connection.close(function () { 
      console.log('App terminated... Database connection closed.'); 
      process.exit(0); 
    }); 
  }); 


  //middlewares
app.use(express.json());
app.use(morgan("dev"));



  app.listen(3000, () => console.log('Server is up'));