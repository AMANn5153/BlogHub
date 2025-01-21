const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    comment:{
        type:String,
        trim:true,
    },
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
        default:null
    }
}, {timestamps:true});


const Comments = mongoose.model("Comments", commentSchema);

module.exports = Comments;
