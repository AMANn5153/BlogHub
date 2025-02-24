const Views = require("../models/views.model");
const asyncHandler = require("../utils/asyncHandler");
const Like = require("../models/like.model");
const mongoose = require("mongoose");
const Comments = require("../models/comments.model");
const moment = require("moment-timezone");
const { listenerCount } = require("../models/user.model");


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


const statsLineChart = asyncHandler(async (req, res, next) => {
    const {blogID} = req.query;
    let {period} = req.query;
    const timezone = "Asia/Kolkata";

    const endDay = moment.tz(timezone).endOf("day")
    const startDay = moment.tz(timezone).subtract(period, "days").startOf("day")

    const timePassed = new Date();
    timePassed.setDate(timePassed.getDate() - period);

    

    const likeStats = await Like.aggregate([
        {
            $match : {
                blogId : new mongoose.Types.ObjectId(`${blogID}`),
                createdAt : {
                    $gte : timePassed
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


    const viewStats = await Views.aggregate([
        {
            $match : {
                blogId : new mongoose.Types.ObjectId(`${blogID}`),
                createdAt : {
                    $gte : timePassed
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


    const commentStats = await Comments.aggregate([
        {
            $match : {
                blogId : new mongoose.Types.ObjectId(`${blogID}`),
                createdAt : {
                    $gte : timePassed
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



    const likes = await mappingLikesAndDates(likeStats, startDay, endDay, "likes");
    const views = await mappingLikesAndDates(viewStats, startDay, endDay, "views");
    const comments = await mappingLikesAndDates(commentStats, startDay, endDay, "comments");

    likes.push( likeStats.length);
    views.push( viewStats.length);
    comments.push(commentStats.length);

    return res.status(200).json({
        success : true,
        message : "stats weekly",
        likes,
        views ,
        comments,
    })
});





module.exports = {
    analytics,
    statsLineChart,
}