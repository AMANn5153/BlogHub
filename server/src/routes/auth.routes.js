const {Router} = require('express');

// middlewares
const authenticate = require("../middleware/authenticate.middleware");
const {uploadProfilePic} = require("../middleware/multer.middleware");
// controller
const {createUser, loginUser, logout, refreshToken, forgetPassword, changePassword} = require("../controller/auth.controller.js");


//router
const authRouter = Router();

// create user
authRouter.route("/createUser").post(uploadProfilePic.single("image"), createUser);

// login user
authRouter.route("/loginUser").post(loginUser);

//logout
authRouter.route("/logout").delete(logout);


authRouter.route("/refreshToken").get(refreshToken);

authRouter.route("/forgetPassword").post(forgetPassword);

authRouter.route("/changePassword").put(changePassword);

module.exports = authRouter;