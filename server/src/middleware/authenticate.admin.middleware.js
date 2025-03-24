const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiErrors");


const authenticateAdmin = async(req, res, next)=>{
    const accessToken = req.cookies?.at;
    const refreshToken = req.cookies?.rt;

    if(!accessToken){
        return res.status(401).json({
            message : "access token is required",
        })
    }

}