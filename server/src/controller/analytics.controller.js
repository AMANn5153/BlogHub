const Views = require("../models/views.model");
const asyncHandler = require("../utils/asyncHandler");
const Like = require("../models/like.model");
const mongoose = require("mongoose");
const Comments = require("../models/comments.model");
const { query } = require("express");


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


const statsWeekly = asyncHandler(async (req, res, next) => {
    const {blogID} = req.query;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const likeStatsWeekly = await Like.aggregate([
        {
            $match : {
                blogId : new mongoose.Types.ObjectId(`${blogID}`),
                userId : new mongoose.Types.ObjectId(`${req.user._id}`),
                createdAt : {
                    $gte : sevenDaysAgo
                }
            }
        },
        {
            $group : {
                _id : {
                    $dateToString : {
                        format : "%Y-%m-%d",
                        date : "$createdAt"
                    }
                    },
                    totalLikes : {$sum : 1},
                },            
        }
        ,{
            $sort : {
                "_id" : 1
            }
        },{
            $project : {
                _id : 0,
                "dates" : "$_id",
                totalViews : 1
            }
        }
    ]);

    const viewStatsWeekly = await Views.aggregate([
        {
            $match : {
                blogId : new mongoose.Types.ObjectId(`${blogID}`),
                userId : new mongoose.Types.ObjectId(`${req.user._id}`),
                createdAt : {
                    $gte : sevenDaysAgo
                }
            }
        },
        {
            $group : {
                _id : {
                    $dateToString : {
                        format : "%Y-%m-%d",
                        date : "$createdAt"
                    }
                    },
                    totalViews : {$sum : 1}
                },            
        },{
            $sort : {
                "_id" : 1
            }
        },{
            $project : {
                _id : 0,
                "dates" : "$_id",
                totalViews : 1
            }
        }
    ]);


    const commentStatsWeekly = await Comments.aggregate([
        {
            $match : {
                blogId : new mongoose.Types.ObjectId(`${blogID}`),
                createdAt : {
                    $gte : sevenDaysAgo
                }
            }
        },
        {
            $group : {
                _id : {
                    $dateToString : {
                        format : "%Y-%m-%d",
                        date : "$createdAt"
                    }
                    },
                    totalComments : {$sum : 1}
                },            
        },{
            $sort : {
                "_id" : 1
            }
        },{
            $project : {
                _id : 0,
                "dates" : "$_id",
                totalComments : 1
            }
        }
    ]);

 

    return res.status(200).json({
        success : true,
        message : "stats weekly",
        weeklyLikes : likeStatsWeekly,
        weeklyViews : viewStatsWeekly,
        weeklyComments : commentStatsWeekly
    })
});


module.exports = {
    analytics,
    statsWeekly
}