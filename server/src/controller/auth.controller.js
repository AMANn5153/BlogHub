const ApiError = require("../utils/ApiErrors");
const User = require("../models/user.model");
const {userSignupSchema} = require("../validator/validator.Schema.js");
const path = require("path");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");

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
   
       const localPath = req.file?.path;
   
       const user = await User.create({
           name:fullname,
           username,
           password,
           email,
           profilePic : localPath
       });
       

       if(!createUser) {
           throw new ApiError( 'cannot create user', 401, "createUser");
       }


       const data = await User.findOne({_id : user._id}).select("-password");

       const pathOfImage = data.profilePic.replace(/\\/g, "/");

       data.profilePic = `http://localhost:3001/${pathOfImage}`;       

       generateTokenAndSetCookie(user, res);

       return res.status(201).json({
           success : true,
           message : "user created",
           data :data
       });

 } catch (err){
    next(err);
 }
}


// login user controller take username or email and password
// checks if user exists in the database


const loginUser = async(req, res, next) => {
    try {
        const {usernameOrEmail, password} = req.body;
    
        if(!usernameOrEmail || !password){
           return new ApiError(401, "Invalid credentials or some field is missing", loginUser);
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
            return new ApiError(403, "User dosen't exists", loginUser);
        }

        const checkPassword = userExists.isPassword(userExists.password);
    
        if(!checkPassword){
            return new ApiError(403, "Invalid credentials", loginUser);
        }
    
    
        const user = await User.findOne({_id : userExists._id}).select(-password);

        const pathOfImage = user.profilePic.replace(/\\/g, "/");

        user.profilePic = `${pathOfImage}`;    
        
        generateTokenAndSetCookie(userExists, res);
        
        return res.status(200).json(
                {
                    success : true,
                    message : "Logged in",
                    data:user
                }
            );


    } catch (error) {
        next(error);
    }

}


const logout = async (req, res) =>{
    
    await User.findOneAndUpdate({_id: req.user._id }, { $set : { refreshToken : undefined }});

    return res.status(200)
    .clearCookie("accessToken", COOKIE_OPTIONS)
    .clearCookie("refreshToken", COOKIE_OPTIONS)
    .json({
        success : true,
        message : "Logged out"
    });

}


    




module.exports = {
    createUser,
    loginUser,
    logout
};

