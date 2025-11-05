// Step 1: Import bcryptjs, jwt, and User model (already at top of file)
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


//REGISTER CONTROLLER

const registerUser = async (req, res) => { //create registerUser function
  try {
    const { username, age, password } = req.body; //get username, age and password from request body

    const exist = await User.findOne({ username }); //check if user already exists
    if (exist) {
      return res.status(409)
      .json({msg: "User already exists"})
    }
         const hashedPassword = await bcrypt.hash(password, 12);
         const user = await User.create({
         username,
         age,
         password: hashedPassword,
       });

       res.status(201).json({ msg: "User registered successfully", user });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






//LOGIN CONTROLLER

const loginUser = async (req, res) => { //create loginUser function
  try {

    const { username, password } = req.body;  //gets username and age and password for login

    const user = await User.findOne({ username }); //check for user in database
    if (!user) {
    
      return res.status(404).json({ msg: "User not found" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) { // compare the user password to the hashed password
   
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // If credentials are correct, generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username }, // payload
      process.env.JWT_SECRET,                   // secret key from .env
      { expiresIn: "1h" }                       // token expires in 1 hour
    );

    // Send success response with user info and token
    res.status(200).json({
      msg: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        age: user.age
      },
      token
    });

  } catch (error) {
    // Catch any unexpected errors
    res.status(500).json({ message: error.message });
  }
};




// export the controller functionn
module.exports = { registerUser, loginUser };

