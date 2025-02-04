const asyncHandler = require("../utils/asyncHandler.js");
const Likes = require("../models/like.model.js");
const mongoose = require("mongoose");
const Comments = require("../models/comments.model.js");

const toggleBlogLike = asyncHandler(async (req, res) => { 
    const {blogId} = req.query;

    console.log(req.user._id);
    
  if(!blogId){
    throw new ApiError("blogId is required", 400, "toggleBlogLike");
  }
  
  const like = await Likes.findOne({
      userId : new mongoose.Types.ObjectId(`${req.user._id}`),
      blogId : new mongoose.Types.ObjectId(`${blogId}`)
  });

  if(!like){
      const toggleLike = await Likes.create(
          {
          userId : new mongoose.Types.ObjectId(`${req.user._id}`),
          blogId : new mongoose.Types.ObjectId(`${blogId}`),
      }
      )  
        return res.status(200).json({
            success : true,
            message : "like toggled successfully",
            data : toggleLike
        });  
  }else{
      const ToggleLike  = await Likes.deleteOne({
        blogId : new mongoose.Types.ObjectId(`${blogId}`),
        userId : new mongoose.Types.ObjectId(`${req.user._id}`),
    });
    return res.status(200).json({
      success : true,
      message : "like toggled successfully",
      data : []
  });
  }
  
});


const toggleCommentLike = asyncHandler(async (req, res, next)=>{
    const {commentId} = req.query;
    if(!commentId){
        throw new ApiError("commentId is required", 400, "toggleCommentLike");
    }

    const comment = await Comments.findOne({_id : new mongoose.Types.ObjectId(`${commentId}`)});

    if(!comment){
        throw new ApiError("comment not found", 404, "toggleCommentLike");
    }



    const like = await Likes.findOne({
        userId : new mongoose.Types.ObjectId(`${req.user._id}`),
        commentId : new mongoose.Types.ObjectId(`${commentId}`)
    });
    
    if(!like){
        const toggleLike = await Likes.create(
            {
            userId : new mongoose.Types.ObjectId(`${req.user._id}`),
            blogId : comment.blogId,
            commentId : new mongoose.Types.ObjectId(`${commentId}`),
        }
        )  
        return res.status(200).json({
            success : true,
            message : "like toggled successfully",
            data : toggleLike
        });  
    }else{
        const ToggleLike  = await Likes.deleteOne({
            commentId : new mongoose.Types.ObjectId(`${commentId}`),
            userId : new mongoose.Types.ObjectId(`${req.user._id}`),
        });
        return res.status(200).json({
            success : true,
            message : "like toggled successfully",
            data : []
        });
    }   
})

module.exports = {
    toggleBlogLike,
    toggleCommentLike
};