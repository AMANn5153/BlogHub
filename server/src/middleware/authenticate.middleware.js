const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const authenticate = async (req, res, next) =>{
    
    const accessToken = req.cookies?.at;
    
    if(!accessToken){
        return res.status(401).json({
            success : false,
            message : "access token is required"
        });
    }
    
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if(err)return null;
        else return decoded;
    });

    if(!decoded){
        return res.status(401).json({
            success : false,
            message : "access token is invalid"
        });
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