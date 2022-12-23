const Joi = require("joi");
// 10:15

const authSchema = Joi.object({
    email : Joi.string().trim().required().lowercase(),
    password: Joi.string().trim().required().min(8).max(18)
})

module.exports = authSchema;