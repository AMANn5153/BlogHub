const Views = require("../models/views.model");
const asyncHandler = require("../utils/asyncHandler");
const Like = require("../models/like.model");
const mongoose = require("mongoose");
const Comments = require("../models/comments.model");
const moment = require("moment-timezone");


const mappingLikesAndDates = (stats, startDay, endDay, statsType) => {
    const map = {};
    stats.forEach(({_id, totalStats})=>{
        map[_id] = totalStats;
    });

    const datesArray = [];

    let currentDate = startDay.clone();

    while(currentDate.isSameOrBefore(endDay)){
        const dateString = currentDate.format("YYYY-MM-DD");
        datesArray.push({
            date : dateString,
            [statsType] : map[dateString] || 0
        });
        currentDate.add(1, "day");
    }

    return datesArray;
}


const analytics = asyncHandler(async (req, res, next) => {

    
    const totalLikes = await  Like.countDocuments({
        authorID : new mongoose.Types.ObjectId(`${req.user._id}`),
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
    const timezone = "Asia/Kolkata";

    const endDay = moment.tz(timezone).endOf("day")
    const startDay = moment.tz(timezone).subtract(6, "days").startOf("day")

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const likeStatsWeekly = await Like.aggregate([
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
                            date : "$createdAt",
                            timezone : timezone
                        }
                    },
                totalStats : {$sum : 1},
                },            
        }
    ]);


    const viewStatsWeekly = await Views.aggregate([
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
                        date : "$createdAt",
                        timezone : timezone
                    }
                    },
                totalStats : {$sum : 1}
                },            
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
                         $dateToString : 
                            {
                                format : "%Y-%m-%d",
                                date : "$createdAt",
                                timezone : timezone
                            }   
                        },
                    totalStats : {$sum : 1}
                },            
        }
    ]);

    const weeklyLikes = await mappingLikesAndDates(likeStatsWeekly, startDay, endDay, "likes");
    const weeklyViews = await mappingLikesAndDates(viewStatsWeekly, startDay, endDay, "views");
    const weeklyComments = await mappingLikesAndDates(commentStatsWeekly, startDay, endDay, "comments");

    return res.status(200).json({
        success : true,
        message : "stats weekly",
        weeklyLikes,
        weeklyViews ,
        weeklyComments 
    })
});


module.exports = {
    analytics,
    statsWeekly
}