const Router = require("express").Router;

const analyticsRouter = Router();

const {analytics, statsWeekly} = require("../controller/analytics.controller");
const authenticate = require("../middleware/authenticate.middleware");


analyticsRouter.route("/getLikesAndViewsAndSaves").get(authenticate, analytics);
analyticsRouter.route("/getLikeWeeklyStats").get(authenticate, statsWeekly);


module.exports = analyticsRouter;