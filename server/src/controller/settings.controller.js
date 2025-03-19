const mongoose = require("mongoose");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user.model.js");
const ApiError = require("../utils/ApiErrors");
const fs = require("fs");

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

        const user = await User.findOne({
            _id : req.user._id
        }).select("-password -createdAt -updatedAt");

        if(username){
            const usernameExists = await User.findOne({username});
            if(usernameExists){
                throw new ApiError("username already exists", 409, "updateUserInfo");
            }
        }

        let profilePicPath = req.file?.path;

        if(profilePicPath){
          

            if(user.profilePic.includes("http://localhost:3001/")){
                const oldProfilePic = user.profilePic.replace("http://localhost:3001/", "");
                await fs.unlink(oldProfilePic);
            }

            profilePicPath = "http://localhost:3001/" + profilePicPath;
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
                profilePic: profilePicPath
            }
        });

        return res.status(200).json({
            success : true,
            message : "user updated successfully",
            data : user
        });
    
});

const changePassword = asyncHandler(async(req, res, next)=>{
    const {currentPassword, newPassword, confirmPassword} = req.body;

    if(!currentPassword || !newPassword || !confirmPassword){
        throw new ApiError("some fields are missing", 401, "changePassword");
    }

    const user = await User.findOne({_id : req.user._id});

    if(!user){
        throw new ApiError("user does not exist", 404, "changePassword");
    }

    if(!user.isPassword(currentPassword)){
        throw new ApiError("current password is invalid", 401, "changePassword");
    }

    if(newPassword !== confirmPassword){
        throw new ApiError("new password and confirm password does not match", 401, "changePassword");
    }

    const updatePassword = await User.findOneAndUpdate({
        _id : req.user._id
    },{
        $set : {
            password : newPassword
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