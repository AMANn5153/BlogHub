const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    blogAuthor :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
        required:true,
        index:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true,
    },
    comment:{
        type:String,
        trim:true,
    },
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
        default:null,
        index:true,
    }
}, {timestamps:true});


const Comments = mongoose.model("Comments", commentSchema);

module.exports = Comments;
