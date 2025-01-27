const mongoose = require("mongoose");


const subscriberSchema = new mongoose.Schema({
    userId:{
        type : mongoose.Types.ObjectId,
        ref : "User"
    },

    subscribedToUser : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    }
});

const Subscribers = mongoose.model("Subscribers", subscriberSchema);

module.exports = Subscribers;