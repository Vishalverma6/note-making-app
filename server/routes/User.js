const express = require("express");
const { signup, login } = require("../controllers/Auth");
const router = express.Router();


// routes for signup
router.post("/signup",signup);


// routes for login
router.post("/login",login);

module.exports = router;