const express = require("express");
const router = express.Router();
const {register , login,getUser} = require('../controllers/userCoontroller')
const {isVerify} = require('../middleware/auth')

// Authentication Route
router.post("/register",register);
router.post("/login",login);
router.get("/user", isVerify,getUser);

module.exports = router;