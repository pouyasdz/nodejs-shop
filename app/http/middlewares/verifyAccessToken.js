const createHttpError = require("http-errors");
const { userModel } = require("../../models/users");
const JWT = require("jsonwebtoken")
const {SECRET_KEY} = require("../../environment")

function VerifyAccessToken(req, res, next){
    const headers = req.headers;
    const [bearer, token]= headers?.["access-token"]?.split(" ") || [];
    
    if(token && ["Bearer", "bearer"].includes(bearer)){
        JWT.verify(token, SECRET_KEY, async (error, payload) =>{
            if(error) return next(createHttpError.Unauthorized("وارد حساب کاربری خود شوید"))
            const {mobile} = payload || {};
            const user = await userModel.findOne({mobile}, {password:0, otp:0});
            if(!user) return next( createHttpError.Unauthorized("حساب کاربری یافت نشد"))

            req.user = user;

            return next()
        })
    }
    else return next(createHttpError.Unauthorized("وار حساب کاربری خود شوید"))
}
module.exports = {
    VerifyAccessToken
}