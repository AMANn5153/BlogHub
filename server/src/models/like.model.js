const mongoose = require("mongoose");


const likeSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    blogId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Blog"
    },
    commentId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    }
});


const Likes = mongoose.model("Likes", likeSchema);

module.exports = Likes;