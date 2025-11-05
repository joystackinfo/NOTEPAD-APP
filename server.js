const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const verifyToken = require('../middleware/authmiddleware.js');
const userRoutes = require('./routes/user.routes');
dotenv.config();


//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ROUTES
app.use('/api/users' , userRoutes);



// Test route
app.get('/', (req, res) => {  // create a get route
  res.send('Hello, Welcome to the CRUD API server '); // send a response
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


