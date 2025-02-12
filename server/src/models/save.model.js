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
}, {timestamps : true});


const Saves = mongoose.model("Saves", saveSchema);


module.exports = Saves;

