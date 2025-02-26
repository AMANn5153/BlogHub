const Comments = require("../models/comments.model");
const Blogs = require("../models/Blog.model");
const asyncHandler = require("../utils/asyncHandler");
const { default: mongoose } = require("mongoose");
const {io} = require("../socket/socket");
const ApiError = require("../utils/ApiErrors");
const Likes = require("../models/like.model");


const newComment = asyncHandler(async(req, res, next) => {
   
    const {comment} = req.body;
    const {id, authorId} = req.query;

    if(!comment || comment === ""){
        throw new ApiError("empty comment is not allowed", 401, "newComment");
    }

    if(!id ){
        throw new ApiError("blogId is missing", 401, "newComment");
    }

    if(!authorId){
        throw new ApiError("authorId is missing", 401, "newComment");
    }


    const blogExists = await Blogs.findOne({
        _id :  new mongoose.Types.ObjectId(`${id}`),
    });

    if(!blogExists){
        throw new ApiError("blog does not exist", 401, "newComment");
    }


    const createdComment = await Comments.create({
        blogAuthor: authorId,
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
        blogAuthor: commentExists.author,
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
            $lookup:{
                from : "users",
                localField : "author",
                foreignField : "_id",
                as : "author",
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
        {
            $lookup : {
                from : "comments",
                localField : "_id",
                foreignField : "parentId",
                as : "replies",
                pipeline:[
                    {
                        $lookup : 
                        {
                            from : "users",
                            localField : "author",
                            foreignField : "_id",
                            as : "author",
                            pipeline:
                            [
                                {
                                    $project : {
                                        "name" : 1,
                                        "profilePic" : 1,
                                    }
                                }
                            ]
                        },  
                    },
                    {
                        $addFields : 
                        {
                            author :{
                                $first : "$author"
                            }
                        }
                    }
                ]
            }
        },
        {
            $addFields:{
                author :{
                    $first : "$author"
                }
            }
        }
    ]);



    res.status(200).json({
        status : "success",
        message : "Comments retrieved successfully",
        comments : comment
    });
});

const editComment = asyncHandler(async(req, res, next)=>{
    const {commentId} = req.query;
    const {comment} = req.body;

    if(!commentId){
        throw new ApiError("commentId is required", 400, "editComment");
    }

    if(!comment){
        throw new ApiError("comment is required", 400, "editComment");
    }

    const commentExists = await Comments.findOne({
        _id : new mongoose.Types.ObjectId(`${commentId}`)
    })

    if(!commentExists){
        throw new ApiError("comment not found", 404, "editComment");
    }

    const updatedComment = await Comments.findOneAndUpdate({
        _id : new mongoose.Types.ObjectId(`${commentId}`)

    },{
        $set : {
            comment : comment
        }
    },{
        new:true
    });

    const editedComment = await Comments.aggregate([
        {
            $match : {
                _id : updatedComment._id
            }
        },
        {
            $lookup:{
                from : "blogs",
                localField : "blogId",
                foreignField : "_id",
                as : "blog",
                pipeline:[
                    {
                        $project: {
                            "_id":1,
                            "heading" : 1,
                        }
                    }
                ]
            }
        },
        {
            $lookup:{
                from : "users",
                localField : "author",
                foreignField : "_id",
                as : "author",
                pipeline : [
                    {
                        $project : {
                            "_id" : 1,
                            "name" : 1,
                            "profilePic" : 1,
                        }
                    }
                ]
            }
        },
        {
            $unwind : "$author"
        }
    ]);

    res.status(200).json({
        success : true,
        message : "comment updated successfully",
        data : editedComment
    });

})

const deleteComment = asyncHandler(async(req, res, next)=>{
    const {commentId} = req.query;

    if(!commentId){
        throw new ApiError("Comment id is required", 400, "deleteComment");
    }

    const commentExists = await Comments.find({_id : new mongoose.Types.ObjectId(`${commentId}`)});

    if(!commentExists){
        throw new ApiError("Comment not found", 404, "deleteComment");
    }

    const deletedThread =await Comments.deleteMany({parentId : new mongoose.Types.ObjectId(`${commentId}`)});
    const deletedComment = await Comments.deleteOne({_id : new mongoose.Types.ObjectId(`${commentId}`)});

    res.status(200).json({
        success : true,
        message : "Comment deleted successfully",
        data : {
            deletedThread,
            deletedComment,
        }
    });

})

module.exports = {
    newComment,
    newReply,
    getComments,
    getCommentThread,
    editComment,
    deleteComment
}