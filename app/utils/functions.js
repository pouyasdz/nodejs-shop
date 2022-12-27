const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { userModel } = require("../models/users");
function randomNumber(){
    return Math.floor((Math.random() * 90000) + 10000)
}
function SignAccessToken(userID){
    return new Promise(async (resolve, reject) => {
        const secret_key = process.env.SECRET_KEY;
        const user = await userModel.findById(userID)
        const payload = {
            mobile:user.mobile,
            userID:user._id
        };
        const secret = "";
        const options = {
            expiresIn : "1h"
        };

        JWT.sign(payload, secret_key, options, (err, token) =>{
            if(err) reject(createHttpError.InternalServerError("خطای سمت سرور"))
            resolve(token)
        })
    })
}

module.exports = {randomNumber, SignAccessToken}