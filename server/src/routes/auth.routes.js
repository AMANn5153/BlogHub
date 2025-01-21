const {Router} = require('express');

// middlewares
const authenticate = require("../middleware/authenticate.middleware");
const {uploadProfilePic} = require("../middleware/multer.middleware");
// controller
const {createUser, loginUser, logout} = require("../controller/auth.controller.js");
const errorHandler = require('../middleware/ErrorHandler.middleware.js');


//router
const authRouter = Router();

// create user
authRouter.route("/createUser").post(uploadProfilePic.single("image"), createUser);

// login user
authRouter.route("/loginUser").post(loginUser);

//logout
authRouter.route("/logout").delete(authenticate, logout);



module.exports = authRouter;