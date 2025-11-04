// Step 1: Import bcryptjs, jwt, and User model (already at top of file)
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const loginUser = async (req, res) => { //create loginUser function
  try {

    const { username, password } = req.body;  //gets username and password for login

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

// exports
module.exports = { registerUser, loginUser };

