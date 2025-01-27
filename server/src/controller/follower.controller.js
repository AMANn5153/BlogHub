const Subscribers = require("../models/subscriber.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiErrors");
const User = require("../models/user.model");

const addFollower = asyncHandler(async (req, res, next)=>{

    const {userId} = req.query;

    if(!userId){
        throw new ApiError("userId is required", 400, "addFollower");
    }

    const userExists = await User.findOne({_id : new mongoose.Types.ObjectId(`${userId}`)});

    if(!userExists){    
        throw new ApiError("user not found", 404, "addFollower");
    }

    const isFollowing = await Subscribers.findOne({
        userId : new mongoose.Types.ObjectId(`${req.user._id}`),
        subscribedToUser : new mongoose.Types.ObjectId(`${userId}`)
    });

    if(!isFollowing){
        const addFollower = await Subscribers.create({
            userId : new mongoose.Types.ObjectId(`${req.user._id}`),
            subscribedToUser : new mongoose.Types.ObjectId(`${userId}`)
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
            subscribedToUser : new mongoose.Types.ObjectId(`${userId}`)
        });
        res.status(200).json({
            success : true,
            message : "user removed successfully",
            data : []
        });
    }

});


module.exports = {addFollower};
