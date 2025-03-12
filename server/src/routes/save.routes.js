const saveRouter = require("express").Router();
const {toggleSaveBlog, getAllSaves} = require("../controller/save.controller.js");
const authenticate = require("../middleware/authenticate.middleware.js");

saveRouter.route("/toggleSaveBlog").post(authenticate, toggleSaveBlog);

saveRouter.route("/getSaveBlog").get( getAllSaves );

module.exports = saveRouter;