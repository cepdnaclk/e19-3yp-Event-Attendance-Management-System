const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
    }

    if (!token) {
        res.status(401);
        throw new Error("User is not authorized or token is not valid");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            res.status(401);
            throw new Error("User is not authorized");
        }

        // console.log(decoded);
        req.user = decoded.user;
        next();
    });
});

module.exports = validateToken;





// const asyncHandler = require("express-async-handler");
// const jwt = require("jsonwebtoken");

// const validateToken = asyncHandler(async (req, res, next) => {
//     let token;
//     let authHeader = req.headers.authorization || req.headers.Authorization;
//     if(authHeader && authHeader.startsWith("Bearer")){
//         token = authHeader.split(" ")[1];
//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//             if(err){
//                 res.status(401);
//                 throw new Error("User is not authorized");
//             }            
//             // console.log(decoded);
//             req.user = decoded.user;
//             next();
//         });
//         if(!token){
//             res.status(401);
//             throw new Error("User is not authorized or token is not valid");
//         }
//     }
// });

// module.exports = validateToken;