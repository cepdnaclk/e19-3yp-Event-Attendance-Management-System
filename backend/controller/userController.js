// for organizers

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

/////////////// REGISTER event organizers ///////////////
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    // check if all fields are filled
    if(!name || !email || !password) {
        res.status(400);
        throw new Error("All the fields are mandatory");
    }
    // check whether the email is registered before
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already exists");
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password: ", hashedPassword);

    // create the user
    const user = await User.create({
        name,
        email, 
        password: hashedPassword,
    });
    console.log(`User created: ${user}`);

    // send the response
    if(user){
        res.status(201).json({_id:user.id, email: user.email});
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }

    res.json({message: "Register the user"});
});


/////////////// LOGIN organizers ///////////////
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All the fields are mandoatory");
    }

    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign(
            {
                user: {
                    name: user.name,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            // expiration time for token
            { expiresIn: "15m" }
        );
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Invalid email or password");
    }
    res.json({message: "Login the user"});
});


/////////////// GET CURRENT USER ///////////////

// @route GET /api/users/current
// @access Private
const getCurrentUser = asyncHandler(async (req, res) => {    
    res.json(req.user);
    // res.json({message: "Get the current user"});
});

module.exports = {registerUser, loginUser, getCurrentUser};