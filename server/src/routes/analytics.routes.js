const Router = require("express").Router;

const analyticsRouter = Router();

const {analytics} = require("../controller/analytics.controller");


analyticsRouter.route("/getLikesAndViewsAndSaves").get(analytics);


module.exports = analyticsRouter;