const Views = require("../models/views.model");
const asyncHandler = require("../utils/asyncHandler");
const Like = require("../models/like.model");
const mongoose = require("mongoose");
const Comments = require("../models/comments.model");


const analytics = asyncHandler(async (req, res, next) => {

    
    const totalLikes = await   Like.countDocuments({
        userId : new mongoose.Types.ObjectId(`${req.user._id}`)
    })


    const totalComments = await Comments.countDocuments({
        blogAuthor : new mongoose.Types.ObjectId(`${req.user._id}`)
    })

    const totalViews = await Views.countDocuments({
        userId : new mongoose.Types.ObjectId(`${req.user._id}`)
    })

    res.status(200).json(
        {
            sucess: true,
            message : "stats likes, views and saves",
            totalLikes,
            totalComments, 
            totalViews
        }
    )


});

module.exports = {
    analytics
}