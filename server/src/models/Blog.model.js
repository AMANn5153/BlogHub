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
  try {
      const index = indices.blogs;
      const records = {
          _id : doc._id.toString(),
          heading : doc.heading,
          content : doc.content.slice(0,100),
      }
      await index.saveObject(records,{autoGenerateObjectIDIfNotExist : true});
  } catch (error) {
    console.log(error);
  }
})

blogSchema.post("deleteOne", async function(doc){
  try {
      const index = indices.blogs;
      await index.deleteObject(doc._id.toString());
  } catch (error) {
    console.log(error);
  }
});

const Blogs = mongoose.model("Blogs", blogSchema);



module.exports = Blogs;