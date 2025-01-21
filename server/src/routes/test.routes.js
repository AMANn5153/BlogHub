const express = require("express");
const testRouter = express.Router();

const {getPdf, mailPdf} = require("../controller/test.pdf.js");

testRouter.route("/pdf").get(getPdf);
testRouter.route("/sendmail").post(mailPdf);

module.exports = testRouter;