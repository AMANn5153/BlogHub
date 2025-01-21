const Comments = require("../models/comments.model");
const Blogs = require("../models/Blog.model");
const asyncHandler = require("../utils/asyncHandler");
const { default: mongoose } = require("mongoose");
const {io} = require("../socket/socket");
const ApiError = require("../utils/ApiErrors");




const newComment = asyncHandler(async(req, res, next) => {
   
    const {comment} = req.body;
    const {blogId} = req.query;

    if(!comment || comment === ""){
        throw new ApiError("empty comment is not allowed", 401, "newComment");
    }

    if(!blogId){
        throw new ApiError("blogId is missing", 401, "newComment");
    }


    const blogExists = await Blogs.findOne({
        _id :  new mongoose.Types.ObjectId(`${blogId}`),
    });

    if(!blogExists){
        throw new ApiError("blog does not exist", 401, "newComment");
    }


    const createdComment = await Comments.create({
        blogId : new mongoose.Types.ObjectId(`${blogId}`),
        author : req.user._id,
        comment
    })


    if(!createdComment){
        throw new ApiError("comment not created", 401, "newComment");
    }

    io.to(blogId).emit("newComment", createdComment);

    const populatedComment = await Comments.findOne({_id : createdComment._id}).populate("author").sort({createdAt : -1});

    res.status(201).json({
        success : true,
        message : "comment created successfully",
        data : populatedComment
    });

});



const newReply = asyncHandler(async(req, res, next)=>{
    const {reply} = req.body;
    const {commentId} = req.query;


    if(!reply){
        throw new ApiError("empty reply is not allowed", 401, "newReply");
    }

    if(!commentId){
        throw new ApiError("commentId id missing", 401, "newReply");
    }


    const commentExists = await Comments.findOne({
        _id : new mongoose.Types.ObjectId(`${commentId}`),
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

    res.status(201).json({
        success : true,
        message : "comment created successfully",
        data : createdReply
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
        blogId,
        parentId : null,
    }).populate("author").limit(10).skip(page*10).sort({createdAt : -1});
    
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



module.exports = {
    newComment,
    newReply,
    getComments,
    getReply
}