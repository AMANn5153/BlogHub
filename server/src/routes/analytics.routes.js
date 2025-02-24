const Router = require("express").Router;

const analyticsRouter = Router();

const {analytics, statsLineChart} = require("../controller/analytics.controller");
const authenticate = require("../middleware/authenticate.middleware");


analyticsRouter.route("/getLikesAndViewsAndSaves").get(authenticate, analytics);

analyticsRouter.route("/stats").get(authenticate, statsLineChart);



module.exports = analyticsRouter;