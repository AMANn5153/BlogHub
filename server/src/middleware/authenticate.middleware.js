const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiErrors");
const User = require("../models/user.model.js");

const authenticate = async (req, res, next) =>{
    
    const accessToken = req.cookies?.accessToken;
    
    if (!accessToken){
        return res.status(401).json({
            status : 401,
            message : "unauthorized"
        })
    }

    
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if(!decoded){
        res.status(401).json({
            status : 401,
            message : "token is invalid"
        })
    }


    const user = await User.findOne({_id : decoded._id});

    if(!user){
        res.status(409).json({
            status : 409,
            message : "user does not exist"
        })
    }

    req.user = user;


    next();
}

module.exports = authenticate;