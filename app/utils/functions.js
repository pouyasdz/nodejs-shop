const createHttpError = require("http-errors");
const crypto = require("crypto")
const JWT = require("jsonwebtoken");
const { userModel } = require("../models/users");
const { SECRET_KEY } = require("../environment");


function randomNumber(){
    return Math.floor((Math.random() * 90000) + 10000)
}
function SignAccessToken(userID){
    return new Promise(async (resolve, reject) => {
        const secret_key = process.env.SECRET_KEY;
        const user = await userModel.findById(userID)
        const payload = {
            mobile:user.mobile
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

function generateSecretKey(){
    const key = crypto.randomBytes(32).toString("hex").toUpperCase();
    console.log(key);
}

module.exports = {randomNumber, SignAccessToken}