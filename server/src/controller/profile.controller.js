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

    const profile_info = await User.aggregate([
        {
            $match : {
                _id : req.user._id
            }
        },
        {
            $lookup : {
                from : "blogs",
                localField:"_id",
                foreignField : "author",
                as : "blog",
                pipeline:{
                    $project : {
                        "_id" : 1,
                        "heading" : 1,
                    }
                }
            }
        },
        {
            $lookup : {
                from : "saves",
                localField:"_id",
                foreignField : "userId",
                as : "save",
                pipeline : [
                    {
                        $lookup : {
                            from : "blogs",
                            localField : "blogId",
                            foreignField : "_id",
                            as : "BlogsSaves",
                            pipeline : [
                                {
                                    
                                    $lookup : {
                                        from : "users",
                                        localField : "author",
                                        foreignField : "_id",
                                        as : "user",
                                        pipeline : [
                                            {
                                                $project : {
                                                    "name" : 1,
                                                    "profilePic" : 1,
                                                }
                                            }
                                        ]
                                    }
                                }, 
                            ]
                        }
                    }, 
                    {
                        $addFields : {
                            "BlogsSaves" : {
                                $first : "$BlogsSaves"
                            }
                        }
                    },
                    {
                        $project : {
                            "BlogsSaves._id" : 1,
                            "BlogsSaves.heading" : 1,
                            "BlogsSaves.user" : 1,
                        }
                    },

                ]
            }
        },
    ])


    res.status(200).json({
        success : true,
        message : "profile fetched successfully",
        data : profile_info
    })
})


module.exports = {
    getProfile
}