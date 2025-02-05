const Views = require("../models/views.model");
const asyncHandler = require("../utils/asyncHandler");
const Like = require("../models/like.model");
const Saves = require("../models/save.model");
const mongoose = require("mongoose");



const analytics = asyncHandler(async (req, res, next) => {
    
    const totalLikes = await Like.findOne({
        userId : new mongoose.Types.ObjectId(`${req.user._id}`)
    });

    const totalSaves = await Saves.findOne({
        userId : new mongoose.Types.ObjectId(`${req.user._id}`)
    })

    const totalViews = await Views.findOne({
        userId : new mongoose.Types.ObjectId(`${req.user._id}`)
    })

    res.status(200).json(
        {
            sucess: true,
            message : "stats likes, views and saves",
            totalLikes,
            totalSaves, 
            totalViews
        }
    )


});

module.exports = {
    analytics
}