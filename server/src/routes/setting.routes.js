const express = require("express");
const settingRouter = express.Router();

const {setNewInfo} = require("../controller/settings.controller.js");


settingRouter.route("/setNewInfo").post(setNewInfo);


module.exports = {
    settingRouter
}