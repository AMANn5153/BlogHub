
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: false,          
    sameSite: "Lax",  
    maxAge: 10 * 24 * 60 * 60 * 1000, 
}


const generateTokenAndSetCookie = (userExists, res)=>{
    
    const accessToken =  userExists.generateAccessToken();
    const refreshToken = userExists.generateRefreshToken();

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");  // Adjust to your frontend's origin
    res.setHeader("Access-Control-Allow-Credentials", "true");              // Allow credentials (cookies)
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");

    res.cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS);

}

module.exports = generateTokenAndSetCookie;

