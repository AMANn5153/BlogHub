const mongoose = require("mongoose");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user.model.js");
const ApiError = require("../utils/ApiErrors");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const path = require("path")
const {uploadImageToCloudinary, deleteImageFromCloudinary } = require("../utils/Cloudinary.util.js");


const updateUserInfo = asyncHandler(async(req, res, next)=>{
    const {
        name,
        username,
        email,
        bio,
        website,
        workingAt,
        location,
        education} = req.body;

        let user = await User.findOne({
            _id : req.user._id
        }).select("-password -createdAt -updatedAt");

        if(username){
            const usernameExists = await User.findOne({username});
            if(usernameExists && usernameExists.username !== user.username){
                throw new ApiError("username already exists", 409, "updateUserInfo");
            }
        }

        let profilePicPath = req.file?.path;
        let response = ""
       
        if(profilePicPath){
            response = await uploadImageToCloudinary(req.file.path);
            await fs.unlink(path.join(__dirname, `../../public/profile/${req.file.filename}`), (err)=>{
                if(err)console.log(err);
            });
            if(user.display_name)
             await deleteImageFromCloudinary(user.display_name);
        }



        const updateUser = await User.findOneAndUpdate(
        {
            _id : req.user._id
        },
        {
            $set : {
                name,
                username,
                email,
                bio,
                website,
                workingAt,
                location,
                education,
                profilePic: response.secure_url,
                displayName: response.display_name
            }
        },
);

        user = await User.findOne({_id : req.user._id}).select("-password -createdAt -updatedAt");
        const redisKey = `Profile:${req.user._id}`;
        await req.redisClient.set(redisKey, JSON.stringify({user}), );
        await req.redisClient.expire(redisKey, 60);

        return res.status(200).json({
            success : true,
            message : "user updated successfully",
            data : user
        });
    
});

const changePassword = asyncHandler(async(req, res, next)=>{
    const {currentPassword, newPassword} = req.body;

    if(!currentPassword || !newPassword ){
        throw new ApiError("some fields are missing", 401, "changePassword");
    }

    const user = await User.findOne({_id : req.user._id});

    if(!user){
        throw new ApiError("user does not exist", 404, "changePassword");
    }

    if(!user.isPassword(currentPassword)){
        throw new ApiError("wrong current password", 401, "changePassword");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const updatePassword = await User.findOneAndUpdate({
        _id : req.user._id
    },{
        $set : {
            password : hashedPassword
        }
    });

    res.status(200).json({
        success:true,
        message : "password updated successfully",
        data : updatePassword
    })
    
})

module.exports = {
    updateUserInfo,
    changePassword
}