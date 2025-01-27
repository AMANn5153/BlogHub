const mongoose = require("mongoose");

const viewsSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    views : {
        type : Number,
        default : 0
    }
});

const Views = mongoose.model("Views", viewsSchema);

module.exports = Views;