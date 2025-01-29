const mongoose = require("mongoose");

const viewsSchema = new mongoose.Schema({
    blogId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Blogs"
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
}, {timestamps:true});

const Views = mongoose.model("Views", viewsSchema);

module.exports = Views;