const express = require('express');
const {registerUser} = require('../controllers/user.controller'); //import function fro controller
const router = express.Router();
const verifyToken = require('../middleware/authmiddleware.js');


router.get('/', (req, res) => {
  res.send('👋 User route working fine!');
});


// Register user
router.post('/register', registerUser);


module.exports = router;
