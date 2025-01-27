const saveRouter = require("express").Router();
const {toggleSaveBlog} = require("../controller/save.controller.js");
const authenticate = require("../middleware/authenticate.middleware.js");

saveRouter.route("/toggleSaveBlog").post(authenticate, toggleSaveBlog);

module.exports = saveRouter;