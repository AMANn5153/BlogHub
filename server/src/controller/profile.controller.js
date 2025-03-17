const User = require("../models/user.model.js");
const mongoose = require("mongoose");
const Subscribers = require("../models/subscriber.model.js");
const asyncHandler = require("../utils/asyncHandler.js")

const getProfile = asyncHandler(async(req, res, next)=>{
    
    const {_id} = req.query;
    const user = await User.findOne(
        {
            _id : new mongoose.Types.ObjectId(`${_id}`)
        }
    ).select("-password -createdAt -updatedAt");

    const subscriber = await Subscribers.countDocuments({
        subscribedToUser : new mongoose.Types.ObjectId(`${_id}`)
    });

    if(!user){
        return res.status(404).json({
            status : 404,
            message : "user does not exist"
        })
    }

    res.status(200).json({
        success : true,
        message : "user info fetched successfully",
        user,
        subscriber
    })

})

const updateProfile = asyncHandler(async(req, res, next)=>{
     
})

module.exports = {
    getProfile,
    updateProfile
}