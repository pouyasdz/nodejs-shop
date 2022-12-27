const createHttpError = require("http-errors");
const Joi = require("joi");

const getOTPSchema = Joi.object({
    mobile : Joi.string().length(11).pattern(/^09[0-9]{9}$/).required().error(createHttpError.BadRequest("شماره موبایل وارد شده نادرست است")),
})

const checkOTPSchema = Joi.object({
    mobile : Joi.string().length(11).pattern(/^09[0-9]{9}$/).required().error(createHttpError.BadRequest("شماره موبایل وارد شده نادرست است")),
    code : Joi.string().min(4).max(6).error(createHttpError.BadRequest("کد ارسال شده صحیح نمیباشد"))
})

module.exports = {
    getOTPSchema,
    checkOTPSchema
}