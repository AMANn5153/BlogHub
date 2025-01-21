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

    bio:{
        type:String,
        trim:true,
    },

    website:{
        type: String,
        validate(val){
            if(!validator.isURL(val))
                throw new Error("Invalid URL");
        }
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

    refreshToken:{
        type:String,
        trim:true
    }

}, {timestamps:true});


userSchema.pre("save", async function(next){
    if(!this.isModified("password"))return next();

    this.password = await bcrypt.hash(this.password, 10);

    next();
    
});

userSchema.methods.isPassword = function(password){
    return bcrypt.compare(password, this.password);
}

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

