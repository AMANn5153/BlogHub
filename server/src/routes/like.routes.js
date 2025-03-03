const LikeRouter = require("express").Router();

const {toggleBlogLike, toggleCommentLike, getAllLikes} = require("../controller/like.controller");
const authenticate = require("../middleware/authenticate.middleware");


LikeRouter.route("/toggleBlogLike").post(authenticate, toggleBlogLike);
LikeRouter.route("/toggleCommentLike").post(authenticate, toggleCommentLike);
LikeRouter.route("/getAllLikes").get(authenticate, getAllLikes);



module.exports = LikeRouter;