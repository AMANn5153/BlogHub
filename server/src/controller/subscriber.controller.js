const Subscribers = require("../models/subscriber.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiErrors");
const User = require("../models/user.model");
const mongoose = require("mongoose");

const addSubscriber = asyncHandler(async (req, res, next)=>{

    const {authorID} = req.query;


    if(!authorID){
        throw new ApiError("user you want to subscribe is required", 400, "addFollower");
    }

    const userExists = await User.findOne({_id : new mongoose.Types.ObjectId(`${authorID}`)});

    if(!userExists){    
        throw new ApiError("user not found", 404, "addFollower");
    }

    const isFollowing = await Subscribers.findOne({
        userId : req.user._id,
        subscribedToUser : new mongoose.Types.ObjectId(`${authorID}`)
    });

    if(!isFollowing){
        const addFollower = await Subscribers.create({
            userId : new mongoose.Types.ObjectId(`${req.user._id}`),
            subscribedToUser : new mongoose.Types.ObjectId(`${authorID}`)
        });

        res.status(201).json({
            success : true,
            message : "user added successfully",
            data : addFollower
        });

    }
    else{
        await Subscribers.deleteOne({
            userId : new mongoose.Types.ObjectId(`${req.user._id}`),
            subscribedToUser : new mongoose.Types.ObjectId(`${authorID}`)
        });
        res.status(200).json({
            success : true,
            message : "user removed successfully",
            data : []
        });
    }

});

const getSubscribed = asyncHandler(async(req, res, next)=>{
    const _id = req.query._id;

    if(!_id){
        return res.status(401).json({
            success : false,
            message : "user not found",
        });
    }
    
    const subscribed = await Subscribers.find({
        userId : new mongoose.Types.ObjectId(`${_id}`)
    });

    res.status(200).json({
        success : true,
        message : "user subscribed successfully",
        data : subscribed
    })
});

const getSubscribedProfile = asyncHandler(async (req, res, next) => {
    const _id = req.query._id;

    const subscribed = await Subscribers.aggregate([
        {
            $match :{
                userId : new mongoose.Types.ObjectId(`${_id}`)
            }
        },
        {
            $lookup:{
                from : "users",
                localField : "subscribedToUser",
                foreignField : "_id",
                as : "following",
                pipeline : [
                    {
                        $project : {
                            _id : 1,
                            name : 1,
                            profilePic : 1,
                            username : 1
                        }
                    }
                ]
            }
        },
        {
            $unwind : "$following"
        },
        {
            $replaceRoot : {
                newRoot : "$following"
            }
        }
       
    ]);


    res.status(200).json({
        success : true,
        message : "subscribed profile fetched successfully",
        data : subscribed
    });
});


module.exports = {
    getSubscribed, 
    addSubscriber,
    getSubscribedProfile
};
