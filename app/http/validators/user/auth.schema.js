const Joi = require("joi");

const authSchema = Joi.object({
    mobile : Joi.string().length(11).pattern(/^09[0-9]{9}$/).required().error(new Error("شماره موبایل وارد شده نادرست است"))
})

module.exports = authSchema;