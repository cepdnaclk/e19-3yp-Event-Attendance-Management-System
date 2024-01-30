// for organizers

const express = require("express");
const { registerUser, getUserName, loginUser, getCurrentUser, getAllUsers } = require("../controller/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.get('/get-name/:email', getUserName);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current",validateToken, getCurrentUser);  // IF SOME OF THE ROUTES TO VALIDATE

router.get("/", validateToken, getAllUsers);

module.exports = router;