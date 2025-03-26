const ApiError = require("../utils/ApiErrors");
const User = require("../models/user.model");
const {userSignupSchema} = require("../validator/validator.Schema.js");
const path = require("path");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");
const asyncHandler = require("../utils/asyncHandler.js");
const jwt = require("jsonwebtoken");
const template = require("../views/email_forget_templateEngine");
const passport = require('passport');
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",          // Set to false since you're likely using HTTP (not HTTPS) in development.
    sameSite: "Lax",        // Lax allows cookies to be sent with top-level navigations and some cross-site requests.
};

const createUser = async (req, res, next) => {
 try {

        const {fullname, username, password, email, confirmPassword } = req.body;
    //    const {error} = userSignupSchema.validate({name, username, password, email, confirmPassword}, {abortEarly: false});
    //    if(error){
    //        throw new ApiError(403, "validation failed", "createUser" ,JSON.stringify(error));
    //    }

       if([fullname, username, password, email, confirmPassword].some((val)=>val === "")){
           throw new ApiError( "some fields are missing", 401,"createUser");
       }

       if(password !== confirmPassword){
           throw new ApiError( "password and confirm password does not match", 401,"createUser");
       }
   
       const isUserExists =  await User.findOne({$or:[{email}, {username}]});
   
       if(isUserExists){
           throw new ApiError( "User already exists", 401,"createUser");
       }
   
       const path = req.file?.path;

       let localPath = "";

       if(path){
           const replaceSlash = path.replace(/\\/g, "/");
           localPath = `http://localhost:3001/${replaceSlash}`
       }
   
       const user = await User.create({
           name:fullname,
           username,
           password,
           email,
           profilePic : localPath || `https://api.dicebear.com/9.x/initials/svg?seed=${fullname}`
       });
       

       if(!createUser) {
           throw new ApiError( 'cannot create user', 401, "createUser");
       }

       const data = await User.findOne({_id : user._id}).select("-password");    

       generateTokenAndSetCookie(user, res);

       const token = jwt.sign({_id : user._id}, process.env.AUTH_TOKEN_SECRET, {expiresIn : process.env.AUTH_TOKEN_EXPIRY});

       return res.status(201).json({
           success : true,
           message : "user created",
           data,
           token
       });

 } catch (err){
    next(err);
 }
}

const loginUser = asyncHandler(async(req, res, next) => {
        
        const {usernameOrEmail, password} = req.body;
        
        if(!usernameOrEmail || !password){
            throw new ApiError("Invalid credentials or some field is missing", 401, "loginUser");
        }

        let userExists = "";
        const regexEmail = /\S+@\S+\.\S+/;
        

        if(regexEmail.test(usernameOrEmail)){
            userExists = await User.findOne({email : usernameOrEmail});
        }
        else{
            userExists = await User.findOne({username : usernameOrEmail});
        }

    
        if(!userExists){
            throw new ApiError("User dosen't exists", 401, "loginUser");
        }

        const checkPassword = await bcrypt.compare(password, userExists.password);
        
        if(!checkPassword){
            throw new ApiError("Invalid credentials", 401, "loginUser");
        }
    
        const user = await User.findOne({_id : userExists._id}).select("-password -createdAt -updatedAt");
        
        generateTokenAndSetCookie(userExists, res);

        const token = jwt.sign({_id : userExists._id}, process.env.AUTH_TOKEN_SECRET, {expiresIn : process.env.AUTH_TOKEN_EXPIRY});
        
        return res.status(200).json(
                {
                    success : true,
                    message : "Logged in",
                    user,
                    token
                }
        );

});

const refreshToken = asyncHandler(async (req, res, next)=>{
    const refreshToken = req.cookies?.refreshToken;

    if(!refreshToken){
        return res.status(401).json({
            status :  401,
            message : "refresh token not found",
            data : null
        })
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,(err, decoded)=>{
        if(err)return null;
        else return decoded;
    });

    if(!decoded){
        res.clearCookie("refreshToken").clearCookie("accessToken");       
         return res.status(401).json({
            status :  401,
            message : "login again",
        })
    }

    const user = await User.findOne({_id : decoded._id});

    generateTokenAndSetCookie(user, res);

    return res.status(200).json({
        status : 200,
        message : "token refreshed"
    })
});

const logout = async (req, res) =>{
    
    return res.status(200)
    .clearCookie("at", COOKIE_OPTIONS)
    .clearCookie("rt", COOKIE_OPTIONS)
    .json({
        success : true,
        message : "Logged out"
    });

}

const forgetPassword = asyncHandler(async (req, res, next) =>{
    const {email} = req.body;

    if(!email){
        throw new ApiError("email is missing", 401, "forgetPassword");
    }

    const userExists = await User.findOne({email});

    if(!userExists){
        throw new ApiError("user does not exist", 404, "forgetPassword");
    }

    const token = jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn : "10m"});

    const url = `http://localhost:3000/changePassword/${token}`;

    const emailForgetData = template({name: userExists.name, url});

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "amannegi.1006@gmail.com",
          pass: process.env.PASSWORD,
        },
    });


    const mailOptions = {
        from: "amannegi.1006@gmail.com",
        to: email,
        subject: "Password Reset",
        html: emailForgetData,
    };

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.status(500).json({
                success: false,
                error ,
            });
        }
        else{
            res.status(200).json({
                success: true,
                message: "email sent",
            });
        }
    });
});

const changePassword = asyncHandler(async(req, res, next)=>{
    const {token, password, confirmPassword} = req.body;
    
    if(!token){
        throw new ApiError("token is required", 401, "changePassword");
    }

    if(!password){
        throw new ApiError("password is required", 401, "changePassword");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if(err)return err;
        return decoded;
    });

    if(!decodedToken){
        return res.status(401).json({
            status : 401,
            message : "token is invalid"
        })
    }

    if(!decodedToken.email){
        throw new ApiError("email is different", 401, "changePassword");
    }

    const user = await User.findOne({email : decodedToken.email});

    if(!user){
        throw new ApiError("user does not exist", 404, "changePassword");
    }   

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatePassword = await User.findOneAndUpdate(
        {_id : user._id},
        {$set :{password : hashedPassword}}, 
        {new : true}
    );

    if(!updatePassword){
        res.status(409).json({
            status : 409,
            message : "coundn't update password"
        })
    }

    const updatedUser = await User.findOne({_id : user._id}).select("-password");
    
    generateTokenAndSetCookie(user, res);

    const authToken = jwt.sign({_id : user._id}, process.env.AUTH_TOKEN_SECRET, {expiresIn : process.env.AUTH_TOKEN_EXPIRY});

    return res.status(200).json({
        success : true,
        message : "password updated",
        data : updatedUser,
        authToken
    });

});

const refreshAccessToken = asyncHandler(async (req, res, next)=>{
    const refreshToken = req.cookies?.rt;
    const accessToken = req.cookies?.at;

    if(accessToken){
        const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
            if(err)return null;
            return decoded;
        })
        
        if(accessToken){
            return res.status(200).json({
            sucess : true,
            message : "valid access token",
            });
        }
    }

    if(!refreshToken){
        return res.status(401).json({
            status : 401,
            message : "user is not logged in"
        })
    }


    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode)=>{
        if(err)return null;
        return decode;
    })

    if(!decoded){
        return res.status(401).json({
            status : 401,
            message : "refresh token is invalid Login in again"
        });
    }

    const userWithNewTokens = await User.findOne({_id : decoded._id}).select("-password -createdAt -updatedAt");

    generateTokenAndSetCookie(userWithNewTokens, res);

    return res.status(200).json({
        status : 200,
        message : "tokens regenerated",
    })

})

const newToken = asyncHandler(async (req, res, next)=>{
    const accessToken = req.cookies?.at;
    const refreshToken = req.cookies?.rt;

    if(!accessToken && !refreshToken){
        return res.status(401).json({
            status : 401,
            message : "user is not logged in"
        })
    }

    let decodedToken = null;
    if(accessToken){
        decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
            if(err)return null;
            return decoded;
        });
    }else if(refreshToken){
        decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded)=>{
            if(err)return null;
            return decoded;
        });
    }


    if(!decodedToken){
        return res.status(401).json({
            status : 401,
            message : "invalid tokens"
        })
    }

    const user = await User.findOne({_id : decodedToken._id}).select("-password -createdAt -updatedAt");

    const token = jwt.sign({_id : user._id}, process.env.AUTH_TOKEN_SECRET, {expiresIn : process.env.AUTH_TOKEN_EXPIRY});

    return res.status(200).json({
        success : true,
        message : "token generated",
        token,
        user
    })

});

const getUserInfo = asyncHandler(async (req, res, next)=>{

    const token = req.headers?.authorization.split(" ")[1];
    const accesstoken = req.cookies?.at;

    if(!token){
        return res.status(401).json({
            status : 401,
            message : "token is missing"
        })
    }


    const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN_SECRET, (err, decoded)=>{
        if(err)return null;
        return decoded;
    });
    
    if(!decodedToken){
        return res.status(401).json({
            status : 401,
            message : "token is invalid"
        })
    }

    const decodedAccessToken = jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if(err)return null;
        return decoded;
    });

    if(decodedAccessToken._id !== decodedToken._id){
        return res.status(401).json({
            status : 401,
            message : "token is invalid"
        })
    }

    const user = await User.findOne({_id : decodedToken._id}).select("-password -createdAt -updatedAt");

    return res.status(200).json({
        success : true,
        message : "user info fetched",
        user
    });
});


module.exports = {
    createUser,
    loginUser,
    logout,
    forgetPassword,
    changePassword,
    refreshAccessToken,
    newToken,
    getUserInfo, 
};

