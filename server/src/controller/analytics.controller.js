const Analytics = require("../models/analytics.model");
const asyncHandler = require("../utils/asyncHandler");



const analytics = asyncHandler(async (req, res, next) => {

    const totalLikes = await Like.findOne({
        
    })

})