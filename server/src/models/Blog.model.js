const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required:true
    },
    heading:{
        type: String,
        required: true,
        trim:true,
    },
    content:{
        type:String,
        trim:true,
    },
    coverImage:{
        type:String,
        trim:true,
    },
    status:{
        type:String,
        enum:["draft", "published"],
        default:"draft",
    }
}, {timestamps:true});

const Blogs = mongoose.model("Blogs", blogSchema);

module.exports = Blogs;