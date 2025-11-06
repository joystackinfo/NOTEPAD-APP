const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const verifyToken = require('../middleware/authMiddleware.js');
