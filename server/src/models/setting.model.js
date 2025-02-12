const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },

    theme : {
        type : String,
        default : "light"
    },

    font : {
        type : String,
        default : "sans-serif"
    },
    
    fontSize : {
        type : String,
        default : "16px"
    },
    
}, {timestamps : true});

const Settings = mongoose.model("Settings", settingSchema);

module.exports = Settings;