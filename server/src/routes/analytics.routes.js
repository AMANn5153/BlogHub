const Router = require("express").Router;

const analyticsRouter = Router();

const {analytics} = require("../controller/analytics.controller");
const authenticate = require("../middleware/authenticate.middleware");


analyticsRouter.route("/getLikesAndViewsAndSaves").get(authenticate, analytics);


module.exports = analyticsRouter;