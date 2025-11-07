const express = require("express");
const router = express.Router();
const Note = require("../models/note.model.js");
const verifyToken = require('../middleware/authMiddleware.js');

// Example test route
router.get("/", (req, res) => {
  res.send("Notes route working!");
});

module.exports = router;
