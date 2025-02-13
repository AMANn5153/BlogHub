const User = require("../models/user.model");

const profile = asyncHandler(async (req, res, next)=>{
    const {id} = req.query;

    if(!id){
        throw new ApiError("id is missing", 401, "profile");
    }



});