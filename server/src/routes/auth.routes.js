const {Router} = require('express');

const authenticate = require("../middleware/authenticate.middleware");

const {uploadProfilePic} = require("../middleware/multer.middleware");

const {createUser, newToken, getUserInfo,
         loginUser, logout, forgetPassword, changePassword, refreshAccessToken} = require("../controller/auth.controller.js");

const authRouter = Router();




authRouter.route("/createUser").post(uploadProfilePic.single("image"), createUser);

authRouter.route("/loginUser").post(loginUser);

authRouter.route("/logout").delete(logout);

// authRouter.route("/refreshToken").get(refreshToken);

authRouter.route("/forgetPassword").post(forgetPassword);

authRouter.route("/changePassword").put(changePassword);

authRouter.route("/checkAccessToken").get(refreshAccessToken);

authRouter.route("/newToken").get(newToken);

authRouter.route("/getUserInfo").get(authenticate, getUserInfo);

module.exports = authRouter;