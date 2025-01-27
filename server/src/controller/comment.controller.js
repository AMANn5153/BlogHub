const Comments = require("../models/comments.model");
const Blogs = require("../models/Blog.model");
const asyncHandler = require("../utils/asyncHandler");
const { default: mongoose } = require("mongoose");
const {io} = require("../socket/socket");
const ApiError = require("../utils/ApiErrors");
const Likes = require("../models/like.model");


const newComment = asyncHandler(async(req, res, next) => {
   
    const {comment} = req.body;
    const {id} = req.query;

    if(!comment || comment === ""){
        throw new ApiError("empty comment is not allowed", 401, "newComment");
    }

    if(!id){
        throw new ApiError("blogId is missing", 401, "newComment");
    }


    const blogExists = await Blogs.findOne({
        _id :  new mongoose.Types.ObjectId(`${id}`),
    });

    if(!blogExists){
        throw new ApiError("blog does not exist", 401, "newComment");
    }


    const createdComment = await Comments.create({
        blogId : new mongoose.Types.ObjectId(`${id}`),
        author : req.user._id,
        comment
    })


    if(!createdComment){
        throw new ApiError("comment not created", 401, "newComment");
    }

    io.to(id).emit("newComment", createdComment);

    const populatedComment = await Comments.findOne({_id : createdComment._id}).populate("author").sort({createdAt : -1});

    res.status(201).json({
        success : true,
        message : "comment created successfully",
        data : populatedComment
    });

});

const newReply = asyncHandler(async(req, res, next)=>{

    const {reply} = req.body;
    const {id} = req.query;


    if(!reply){
        throw new ApiError("empty reply is not allowed", 401, "newReply");
    }

    if(!id){
        throw new ApiError("commentId id missing", 401, "newReply");
    }


    const commentExists = await Comments.findOne({
        _id : new mongoose.Types.ObjectId(`${id}`),
    });

    if(!commentExists){
        throw new ApiError("comment does not exist", 401, "newReply");
    }

    const createdReply = await Comments.create({
        blogId : commentExists.blogId,
        author : req.user._id,
        comment : reply,
        parentId : commentExists._id
    });

    const populatedReply = await Comments.findOne({_id : createdReply._id}).populate("author").select("-password");

    res.status(201).json({
        success : true,
        message : "comment created successfully",
        data : populatedReply
    });

});

const getComments = asyncHandler(async(req, res) => {
    const {blogId, page} = req.query;


    if(!blogId){
        throw new ApiError("blogId is missing", 401, "getComments");
    }

    const Blog = await Blogs.findOne({_id : new mongoose.Types.ObjectId(`${blogId}`)});

    if(!Blog){
        throw new ApiError("blog not found", 404, "getComments");
    }


    const comments = await Comments.find({
        blogId : new mongoose.Types.ObjectId(`${blogId}`), 
        parentId : null
    }).sort({createdAt : -1}).populate("author");

    
    res.status(200).json({
        success : true,
        message : "comments fetched successfully",
        data : comments
    })
});

const getReply = asyncHandler(async(req, res, next) => {
    const {commentId, page} = req.query;


    if(!commentId){
        throw new ApiError("commentId is missing", 401, "getReply");
    }

    const commentExists = await Comments.findOne({
        _id : new mongoose.Types.ObjectId(`${commentId}`)
    });

    if(!commentExists){
        throw new ApiError("Comment not found", 401, "getReply");
    }

    const replies = await Comments.find({
        parentId : commentId,
    }).limit(10).skip(page*10);

    res.status(200).json({
        status : "success",
        message : "Comment added successfully",
        data : replies
    })

})

const getCommentThread = asyncHandler(async(req, res, next) => {
    const {commentId} = req.query;    

    if(!commentId){ 
        throw new ApiError("commentId is required", 400, "getCommentThread");
    }

    const comment = await Comments.aggregate([
        {
            $match : {
                _id : new mongoose.Types.ObjectId(`${commentId}`),
            }
        },
        {
            $lookup : {
                from : "comments",
                localField : "_id",
                foreignField : "parentId",
                as : "replies"
            }
        },
        {
            $lookup : {
                from : "users",
                localField : "author",
                foreignField : "_id",
                as : "author"
            },
        },
        {
            $unwind: "$author"
        },
        {
            $lookup : {
                from : "users",
                localField : "replies.author",
                foreignField : "_id",
                as : "replyAuthors"
            }
        },
        {
            $addFields : {
                replies :{ // array of replies
                    $map : {
                        input : "$replies",
                        as : "reply",   
                        in : {
                            $mergeObjects : ["$$reply", {
                                author : {
                                    $arrayElemAt : [ {
                                        $filter : {
                                            input : "$replyAuthors",
                                            as : "replyAuthor",
                                            cond : {
                                                $eq : ["$$replyAuthor._id", "$$reply.author"]
                                            }
                                        }
                                    }, 0]
                                }
                            }]
                        }
                    }
                }
            }
        },{
            "$project" : {
                "author.password": 0,
                "author.refreshToken": 0,
                "author.username": 0,
                "author.createdAt": 0,
                "author.updatedAt": 0,
                "parentId": 0,
                "replies.parentId": 0,
                "replies.blogId": 0,
                "replies.author.password": 0,
                "replies.author.refreshToken": 0,
                "replies.author.username": 0,
                "replies.author.createdAt": 0,
                "replies.author.updatedAt": 0,
                replyAuthors : 0,
            }
        },
    ]);



    res.status(200).json({
        status : "success",
        message : "Comments retrieved successfully",
        comments : comment
    });
});


module.exports = {
    newComment,
    newReply,
    getComments,
    getReply,
    getCommentThread
}