const LikeRouter = require("express").Router();

const {toggleBlogLike} = require("../controller/like.controller");
const authenticate = require("../middleware/authenticate.middleware");


LikeRouter.route("/toggleBlogLike").post(authenticate, toggleBlogLike);


module.exports = LikeRouter;