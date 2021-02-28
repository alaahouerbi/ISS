const port=process.env.PORT || 3000
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const MesssageService=require('./services/messageService')();
const app = express();
const server = require('http').createServer(app);


// Connect to DB
const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
const io = require('socket.io')(server, {
  cors: {
    //not sure about this
    origin: process.env.NODE_ENV==='production'? process.env.apiUrl : process.env.apiUrlDev ,
    methods: ["GET", "POST"]
  }
});
mongoose.connect(process.env.DB_STRING, options);

mongoose.connection.on('connected', function () {
  console.log('Database connection established!');
});

mongoose.connection.on('error', function (err) {
  console.log('Database connection connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Database disconnected');
});

// Safe exit on Node process crash
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('App terminated... Database connection closed.');
    process.exit(0);
  });
});


//middlewares
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('new-message', async (message) => {
    await MesssageService.addMessage(message);
    io.emit('new-message',message);
  
   
  });
   socket.on('disconnect',()=>{console.log("a user disconnected")})
});
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use('/api', require('./api/router'));


server.listen(port, () => console.log(`Server is up running on${port}`));