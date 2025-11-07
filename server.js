const express = require('express')
const dotenv = require("dotenv");
const cors = require("cors"); 
const noteRoutes = require("./routes/note.route.js");
const mongoose = require('mongoose');
 const userRoutes = require('./routes/user.routes.js');
const app = express()
const verifyToken = require('./middleware/authMiddleware.js');
require('dotenv').config();




//MIDDLEWARE
app.use(express.json()) // Allow express to parse json
app.use(express.urlencoded({extended:false})) // Allow express to parse urlencoded data


// ROUTES

app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes); //for user routes




  //FOR LOGGING TO TRACK REQUESTS
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// Test route
app.get('/', (req, res) => {  // create a get route
  res.send('Hello, Welcome to the  NOTEPAD server '); // send a response
});





// connect to mongodb database using mongoose
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(' Connected to Database');
    app.listen(process.env.PORT, () => {
      console.log(` Server is running on port ${process.env.PORT}`);
    });
  }
)

  .catch(err => {
    console.error(' Connection failed', err);
  });
