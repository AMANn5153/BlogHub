const mongoose = require("mongoose");

const saveSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    blogId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Blog"    
    },
    CommentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    }
})


const Saves = mongooose.model("Saves", saveSchema);


module.exports = Saves;

