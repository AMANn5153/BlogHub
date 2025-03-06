const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const authenticate = async (req, res, next) =>{
    
    const accessToken = req.cookies?.accessToken;
    
    if(!accessToken){
       return next();
    }
    
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if(err)return null;
        else return decoded;
    });

    if(!decoded){
       return next();
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