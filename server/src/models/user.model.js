const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },

    username:{
        type:String,
        require:true,
        trim:true,
        lowercase:true
    },

    email: {
        type: String,
        required:true,
        trim:true,
        lowercase:true,
        validate(val){
            if(!validator.isEmail(val))throw new Error("Invalid Email!");
        }
    },

    password:{
        type:String, 
        required:true
    },

    profilePic:{
        type:String,
        trim:true
    },

    displayName:{
        type:String,
        trim:true
    },

    bio:{
        type:String,
        trim:true,
        maxlength:200
    },

    website:{
        type: String,
        validate(val){
            if(!validator.isURL(val))
                throw new Error("Invalid URL");
        }
    },

    workingAt : {
        type : String,
        trim : true
    },

    location : {
        type : String,
        trim : true
    },

    education : {
        type : String,
        trim : true
    },

    role : {
        type : String,
        enum : ["user", "admin"],
        default : "user"
    },
    

}, {timestamps:true});


userSchema.pre("save", async function(next){
    if(!this.isModified("password"))return next();

    this.password = await bcrypt.hash(this.password, 10);

    next();
    
});

userSchema.methods.isPassword =async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.post("save", async function(doc){
    const index = indices.users;
    const records = {
        _id : doc._id,
        name : doc.name,
        username: doc.username,
        email : doc.email,
        profilePic : doc.profilePic,
    }
    index.saveObject(records);
})

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id : this._id,
        username: this.username,
        name: this.name,
        email: this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn : process.env.ACCESS_TOKEN_EXPIRY});
}


userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id : this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn : process.env.REFRESH_TOKEN_EXPIRY});
}



const User = mongoose.model("User", userSchema);

module.exports = User;

