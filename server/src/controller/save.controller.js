const Saves = require("../models/save.model.js");
const asyncHandler = require("../utils/asyncHandler.js");
const mongoose = require("mongoose");
const ApiError = require("../utils/ApiErrors.js");
const Blogs = require("../models/Blog.model.js");


const toggleSaveBlog = asyncHandler(async (req, res, next) => {
    const {blogId} = req.query;
    
    if(!blogId){
        throw new ApiError("blogId is required", 400, "saveBlog");
    }

    const blogExists = await Blogs.findOne({_id : new mongoose.Types.ObjectId(`${blogId}`)});

    if(!blogExists){
        throw new ApiError("blog not found", 404, "saveBlog");
    }

    const save = await Saves.findOne({
        userId : new mongoose.Types.ObjectId(`${req.user._id}`),
        blogId : new mongoose.Types.ObjectId(`${blogId}`)
    });

    if(!save){
        const saveBlog = await Saves.create({
            userId : new mongoose.Types.ObjectId(`${req.user._id}`),
            blogId : new mongoose.Types.ObjectId(`${blogId}`),
        });
        return res.status(200).json({
            success : "true",
            message : "blog saved successfully",
            data : saveBlog
        });
    }
    else{
        const unsaveBlog = await Saves.deleteOne({
            userId : new mongoose.Types.ObjectId(`${req.user._id}`),
            blogId : new mongoose.Types.ObjectId(`${blogId}`)
        });

        return res.status(200).json({
            success : "true",
            message : "blog unsaved successfully",
            data : []
        });
    }


});

const getAllSaves = asyncHandler(async (req, res, next) => {
    const {id} = req.query;
    const saves = await Saves.aggregate([
        {
            $match: {
                userId : new mongoose.Types.ObjectId(`${id}`)
            }
        },
        {
            $lookup: {
                from: "blogs",
                localField: "blogId",
                foreignField: "_id",
                as: "blog",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "author",
                            foreignField: "_id",
                            as: "author",
                            pipeline: [
                                {
                                    $project: {
                                        _id: 1,
                                        name: 1,
                                        profilePic: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $unwind: "$author" // Ensure author is a single object, not an array
                    },
                    {
                        $lookup: {
                            from: "comments",
                            localField: "_id",
                            foreignField: "blogId",
                            as: "comments"
                        }
                    },
                    {
                        $lookup: {
                            from: "views",
                            localField: "_id",
                            foreignField: "blogId",
                            as: "views"
                        }
                    },
                    {
                        $lookup: {
                            from: "likes",
                            localField: "_id",
                            foreignField: "blogId",
                            as: "likes"
                        }
                    },
                    {
                        $addFields: {
                            commentsCount: { $size: "$comments" },
                            viewsCount: { $size: "$views" },
                            likesCount: { $size: "$likes" }
                        }
                    },{
                        $project : {
                            comments : 0,
                            views : 0,
                            likes : 0
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$blog" // Unwind the blog array to get individual blog objects
        },
        {
            $project: {
                _id: 0,
                userId: 0,
                blogId: 0
            }
        }
    ]);

    res.status(200).json({
        success: true,
        message: "saves fetched successfully",
        data: saves
    });
});






module.exports = {
    toggleSaveBlog,
    getAllSaves
}