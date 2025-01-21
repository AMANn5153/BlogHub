const mongoose = require("mongoose");
const {DATABASE} = require("../constant.js");

const connectToDB = async () =>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.DB}/${DATABASE}`);
        if(connectionInstance){
            console.log(`database is connected at port ${connectionInstance.connection.port}`);
        }
    }
    catch(e){
        console.log("error in mongodb connection", e);
    }
}


module.exports = connectToDB;