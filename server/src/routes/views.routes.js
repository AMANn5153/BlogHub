const viewsRouter = require("express").Router();
const {views} = require("../controller/views.controller");

viewsRouter.route("/updateViews").post(views);

module.exports = viewsRouter;