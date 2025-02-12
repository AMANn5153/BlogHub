const mongoose = require("mongoose");


const likeSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    blogId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Blog",
        default : null
    },
    commentId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment",
        default : null
    }
}, {timestamps : true});


const Likes = mongoose.model("Likes", likeSchema);

module.exports = Likes;