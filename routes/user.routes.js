const express = require('express');
const {registerUser ,loginUser} = require('../controllers/user.controller'); //import function fro controller
const router = express.Router();
const verifyToken = require('../middleware/authmiddleware.js');


router.get('/', (req, res) => {
  res.send('👋 User route working fine!');
});

//login user
router.post('/login', loginUser);

// Register user
router.post('/register', registerUser);


module.exports = router;
