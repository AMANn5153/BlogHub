const  {updateUserInfo} = require("../controller/settings.controller.js")
const authenticate = require("../middleware/authenticate.middleware.js")
const express = require("express");
const { uploadProfilePic } = require("../middleware/multer.middleware.js");
const settingRouter = express.Router();


settingRouter.route("/updateUserInfo").put(authenticate, uploadProfilePic.single("profilePic"), updateUserInfo);


module.exports = settingRouter
