const followerRouter = require('express').Router();
const {addFollower} = require("../controller/follower.controller.js");
const authenticate = require("../middleware/authenticate.middleware.js");

followerRouter.route("/addFollower").post(authenticate, addFollower);

module.exports = followerRouter;