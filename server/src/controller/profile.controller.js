const User = require("../models/user.model.js");
const asyncHandler = require("../utils/asyncHandler");

const getProfile = asyncHandler(async(req, res, next)=>{
    
    const user = await User.findOne({_id : req.user._id});
    
    if(!user){
        return res.status(409).json({
            status : 409,
            message : "user does not exist"
        })
    }

    res.status(200).json({
        success : true,
        message : "user info fetched successfully",
    })

})


module.exports = {
    getProfile
}