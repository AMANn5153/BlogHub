const Views = require("../models/views.model");
const asyncHandler = require("../utils/asyncHandler");
const mongoose = require("mongoose");


const views = asyncHandler(async (req, res, next) => {
    const { blogId, userId } = req.query;

    if (!blogId) {
        throw new ApiError("blogId is required", 400, "views");
    }

    if(!userId){
        throw new ApiError("userId is required", 400, "views");
    }

    const increaseViews = await Views.create({
        blogId: new mongoose.Types.ObjectId(`${blogId}`),
        userId: new mongoose.Types.ObjectId(`${userId}`),
    });

    res.status(200).json({
        success: true,
        message: "views increased successfully",
    });
});


module.exports = {views};