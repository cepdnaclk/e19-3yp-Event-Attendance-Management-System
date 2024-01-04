// for organizers

const express = require("express");
const { registerUser, loginUser, getCurrentUser } = require("../controller/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current",validateToken, getCurrentUser);  // IF SOME OF THE ROUTES TO VALIDATE

module.exports = router;