const express = require("express");
const profileRouter = express.Router();
const Authenticate = require("../middleware/authenticate.middleware");

const {getProfile} = require("../controller/profile.controller");

profileRouter.route("/getProfile").get(Authenticate,getProfile);

module.exports = profileRouter;
