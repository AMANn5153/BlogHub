const {Router} = require('express');

// middlewares
const authenticate = require("../middleware/authenticate.middleware");
const {uploadProfilePic} = require("../middleware/multer.middleware");
// controller
const {createUser, loginUser, logout, refreshToken, passportGoogle} = require("../controller/auth.controller.js");


//router
const authRouter = Router();

// create user
authRouter.route("/createUser").post(uploadProfilePic.single("image"), createUser);

// login user
authRouter.route("/loginUser").post(loginUser);

//logout
authRouter.route("/logout").delete(authenticate, logout);


authRouter.route("/refreshToken").get(refreshToken);

authRouter.route("/google/callback").get(passportGoogle)

module.exports = authRouter;