const joi =  require("joi");

const userSignupSchema = joi.object({
    username : joi.string().min(6).max(20).required(),
    password: joi.string().min(6).max(20).required(),
    email : joi.string().email().required(),
    name : joi.string().max(20).required(),
});


module.exports = {userSignupSchema};