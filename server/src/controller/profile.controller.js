const User = require("../models/user.model.js");
const mongoose = require("mongoose");
const Subscribers = require("../models/subscriber.model.js");
const asyncHandler = require("../utils/asyncHandler.js")

const getProfile = asyncHandler(async(req, res, next)=>{
    
    const {_id} = req.query;

    if(!_id){
        return res.status(404).json({
            sucess:false,
            status : 404,
            message : "user id is required" 
        })
    }

    const redisKey = `profile:${_id}`;

    const cachedUserInfo = await req.redisClient.get(redisKey);

    if(cachedUserInfo){
        const cashedData = JSON.parse(cachedUserInfo);
        return res.status(200).json({
            sucess : true,
            status : 200,
            message : "user info fetched successfully",
            user : cashedData.user,
            subscriber : cashedData.subscriber
        })
    }

    const [user, subscriber] = await Promise.all([ 
    User.findOne(
        {
            _id : new mongoose.Types.ObjectId(`${_id}`)
        }
    ).select("-password -createdAt -updatedAt"), 

    Subscribers.countDocuments({
        subscribedToUser : new mongoose.Types.ObjectId(`${_id}`)
    })
    ])

    await req.redisClient.set(redisKey, JSON.stringify({user, subscriber}));
    await req.redisClient.expire(redisKey, 300);

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



module.exports = {
    getProfile,
}