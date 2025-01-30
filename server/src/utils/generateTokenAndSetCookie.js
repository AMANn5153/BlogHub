
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: false,          // Set to false since you're likely using HTTP (not HTTPS) in development.
    sameSite: "Lax",        // Lax allows cookies to be sent with top-level navigations and some cross-site requests.
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),  // Cookie expires in 1 day.
};
7

const generateTokenAndSetCookie = (userExists, res)=>{
    const accessToken =  userExists.generateAccessToken();
    const refreshToken = userExists.generateRefreshToken();

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");  // Adjust to your frontend's origin
res.setHeader("Access-Control-Allow-Credentials", "true");              // Allow credentials (cookies)
res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");

    res.cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
}

module.exports = generateTokenAndSetCookie;

