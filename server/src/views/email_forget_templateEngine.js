const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");



const templ = fs.readFileSync(path.join(__dirname, "./email_forget.hbs"), "utf8");


const template = handlebars.compile(templ);

module.exports = template;