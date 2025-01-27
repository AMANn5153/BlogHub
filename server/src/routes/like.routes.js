const LikeRouter = require("express").Router();

const {toggleBlogLike, toggleCommentLike} = require("../controller/like.controller");
const authenticate = require("../middleware/authenticate.middleware");


LikeRouter.route("/toggleBlogLike").post(authenticate, toggleBlogLike);
LikeRouter.route("/toggleCommentLike").post(authenticate, toggleCommentLike);


module.exports = LikeRouter;