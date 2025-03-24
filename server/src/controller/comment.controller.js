const Comments = require("../models/comments.model");
const Blogs = require("../models/Blog.model");
const asyncHandler = require("../utils/asyncHandler");
const { default: mongoose } = require("mongoose");
const {io} = require("../socket/socket");
const ApiError = require("../utils/ApiErrors");
const Likes = require("../models/like.model");
const slugify = require("slugify");


const newComment = asyncHandler(async(req, res, next) => {
   
    const {comment, commentInText} = req.body;
    const {slug, authorId} = req.query;

    if(!comment || comment === ""){
        throw new ApiError("empty comment is not allowed", 401, "newComment");
    }

    if(!slug ){
        throw new ApiError("can't find blog", 401, "newComment");
    }

    if(!authorId){
        throw new ApiError("authorId is missing", 401, "newComment");
    }


    const blogExists = await Blogs.findOne({
        slug 
    });

    if(!blogExists){
        throw new ApiError("blog does not exist", 401, "newComment");
    }


    const createdComment = await Comments.create({
        blogAuthor: authorId,
        blogId : blogExists._id,
        author : req.user._id,
        comment
    })


    if(!createdComment){
        throw new ApiError("comment not created", 401, "newComment");
    }

    const lastEndOfId = createdComment._id.toString().slice(-5);
    const blogSlug = slugify(commentInText+" "+lastEndOfId, {lower:true});

    const updateWithSlug = await Comments.findOneAndUpdate(
    {
        _id : createdComment._id
    },
    {
        $set : {
            slug : blogSlug
        }
    });


    const populatedComment = await Comments.aggregate([
        {
            $match : {
                _id : createdComment._id
            }
        },
        {
            $lookup : {
                from : "users",
                localField : "author",
                foreignField : "_id",
                as : "author",
                pipeline : [
                    {
                        $project : {
                            "_password" : 0,
                            "createdAt" : 0,
                            "updatedAt" : 0,
                        }
                    }
                ]
            }
        },
        {
            $addFields : {
                author : {
                    $first : "$author"
                }
            }
        }
    ])

    res.status(201).json({
        success : true,
        message : "comment created successfully",
        data : populatedComment[0]
    });

});

const newReply = asyncHandler(async(req, res, next)=>{

    const {reply, replyInText} = req.body;
    const {commentSlug} = req.query;


    if(!reply){
        throw new ApiError("empty reply is not allowed", 401, "newReply");
    }

    if(!commentSlug){
        throw new ApiError("commentSlug id missing", 401, "newReply");
    }


    const commentExists = await Comments.findOne({
        slug : commentSlug
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

    const lastEndOfId = createdReply._id.toString().slice(-5);
    const slug = slugify(replyInText+" "+lastEndOfId, {lower:true});

    const updateWithSlug = await Comments.findOneAndUpdate(
    {
        _id : createdReply._id
    },
    {
        $set : {
            slug : slug
        }
    });


    const populatedReply = await Comments.aggregate([
        {
        $match :
            {
                blogId : commentExists.blogId ,
                _id : createdReply._id
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
                    },
                ]
            }
        },
        {
            $addFields : {
                author : {
                    $first : "$author"
                }
            }
        },
        {
            $lookup:{
                from : "likes",
                localField : "_id",
                foreignField : "commentId",
                as : "likes",
            }
        },

])

    res.status(201).json({
        success : true,
        message : "comment created successfully",
        data : populatedReply[0]
    });

});

const getComments = asyncHandler(async(req, res) => {
    const {slug, page} = req.query;

    if(!slug){
        throw new ApiError("blogId is missing", 401, "getComments");
    }

    const blog = await Blogs.findOne({slug} );

    if(!blog){
        throw new ApiError("blog not found", 404, "getComments");
    }


    const comments = await Comments.aggregate([
        {
        $match :
            {
                blogId : new mongoose.Types.ObjectId(`${blog._id}`), 
                parentId : null
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
                            "createdAt" : 0,
                            "updatedAt" : 0,
                            "password" : 0,
                        }
                    },
                ]
            }
        },
        {
            $addFields : {
                author : {
                    $first : "$author"
                }
            }
        },
])

    const likes = await Likes.find({
        blogId : new mongoose.Types.ObjectId(`${blog._id}`),
        parentId : null
    })

    
    res.status(200).json({
        success : true,
        message : "comments fetched successfully",
        data : comments,
        likes : likes
    })
});

const getCommentThread = asyncHandler(async(req, res, next) => {
    const {commentSlug} = req.query;    

    if(!commentSlug){
        throw new ApiError("cannot find missing commentSlug", 400, "getCommentThread");
    }

    const comment = await Comments.aggregate([
        {
            $match : {
                slug : commentSlug
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
                            _id :1,
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
                                        _id:1,
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
                    },
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

    const likes = await Likes.find({
        blogId : comment[0].blogId
    })


    res.status(200).json({
        status : "success",
        message : "Comments retrieved successfully",
        comments : comment,
        likes
    });
});

const editComment = asyncHandler(async(req, res, next)=>{
    const {commentSlug} = req.query;
    const {comment, commentInText} = req.body;

    if(!commentSlug){
        throw new ApiError("comment Slug is required", 400, "editComment");
    }

    if(!comment){
        throw new ApiError("comment is required", 400, "editComment");
    }

    const commentExists = await Comments.findOne({
        slug : commentSlug
    });

    if(!commentExists){
        throw new ApiError("comment not found", 404, "editComment");
    }

    const lastEndOfId = commentExists._id.toString().slice(-5);
    const slug = slugify(commentInText+" "+lastEndOfId, {lower:true});

    const updatedComment = await Comments.findOneAndUpdate({
        _id : commentExists._id

    },{
        $set : {
            comment : comment,
            slug : slug
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
    const deletedComment = await Comments.findOneAndDelete({_id : new mongoose.Types.ObjectId(`${commentId}`)});

    const blog = await Blogs.findOne({_id : deletedComment.blogId});

    res.status(200).json({
        success : true,
        message : "Comment deleted successfully",
        data : blog.slug
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