const followerRouter = require('express').Router();
const {getSubscribed, addSubscriber, getSubscribedProfile} = require("../controller/subscriber.controller.js");
const authenticate = require("../middleware/authenticate.middleware.js");

followerRouter.route("/addSubscriber").post(authenticate, addSubscriber);

followerRouter.route("/getSubscribed").get(authenticate, getSubscribed);

followerRouter.route("/getSubscribedProfile").get(authenticate, getSubscribedProfile);

module.exports = followerRouter;