const Router = require("express").Router;
const commentRouter = Router();
const {newComment, newReply, getComments, getCommentThread} = require("../controller/comment.controller.js");
const authenticate = require("../middleware/authenticate.middleware.js");

commentRouter.route("/newComment").post(authenticate, newComment);
commentRouter.route("/newReply").post(authenticate, newReply);
commentRouter.route("/getComments").get(getComments);
commentRouter.route("/getCommentThread").get(getCommentThread);


module.exports = commentRouter;