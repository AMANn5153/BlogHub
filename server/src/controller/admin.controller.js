const ApiError = require("../utils/ApiErrors");
const asyncHandler = require("../utils/asyncHandler");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");


const adminLogin = asyncHandler(async (req, res, next) => {
    
    const {username, password} = req.body;
    
    if(!username || !password){
        throw new ApiError("username and password are required", 401, "adminLogin");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new ApiError("Invalid credentials", 401, "adminLogin");
    }

    const user = await User.findOne({username, role : "admin"}).select("-password, -createdAt, -updatedAt");
    
    if(!user){
        throw new ApiError("user does not exist", 404, "adminLogin");
    }

    generateTokenAndSetCookie(user, res);
    const token = jwt.sign({_id : userExists._id}, process.env.AUTH_TOKEN_SECRET, {expiresIn : process.env.AUTH_TOKEN_EXPIRY});
    
    res.status(200).json({
        success : true,
        message : "user logged in",
        user,
        token
    });
    
});

module.exports = {
    adminLogin
}