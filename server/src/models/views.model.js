const mongoose = require("mongoose");

const viewsSchema = new mongoose.Schema({
    blogId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Blogs"
    },
    views : {
        type : Number,
        default : 0
    }
});

const Views = mongoose.model("Views", viewsSchema);

module.exports = Views;