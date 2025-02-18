const express = require("express");
const profileRouter = express.Router();

const {getProfile} = require("../controller/profile.controller");

profileRouter.route("/getProfile").get(getProfile);

module.exports = profileRouter;
