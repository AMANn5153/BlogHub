const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiErrors");
const User = require("../models/user.model.js");

const authenticate = async (req, res, next) =>{
    
    const accessToken = req.cookies?.accessToken;
    
    if (!accessToken){
        throw new ApiError("Invalid access token", 401, "authenticate");
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if(!decoded){
        throw new ApiError("Unauthorized access token", 401, "authenticate");
    }

    const user = await User.findOne({_id : decoded._id});

    if(!user){
        throw new ApiError("user cannot be created", 409, "authenticate");
    }

    req.user = user;
    next();
}

module.exports = authenticate;