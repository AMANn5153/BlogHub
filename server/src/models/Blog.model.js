const mongoose = require("mongoose");
const {indices} = require("../config/algolia");

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
    },
    slug : {
        type : String,
        unique : true,
        trim : true,
    }
}, {timestamps:true});


blogSchema.post("save", async  function(doc){
    const index = indices.blogs;
    const records = {
        _id : doc._id,
        heading : doc.heading,
        content : doc.content.slice(0,100),
    }
    index.saveObject(records);
})

blogSchema.post("deleteOne", async function(doc){
    const index = indices.blogs;
    index.deleteObject({_id : doc._id});
});

const Blogs = mongoose.model("Blogs", blogSchema);



module.exports = Blogs;