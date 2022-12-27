const { UserAuthController } = require("../../http/controller/users/auth/auth.controller")

const router = require("express").Router()

/**
 * @swagger
 *  tags:
 *      name : User-Authentication
 *      description : user-auth section
 */


/**
 * @swagger
 *  /user/get-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: login user in account with phone number
 *          description : otp login
 *          parameters:
 *          -   name: mobile
 *              description: IR PhoneNumber
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: bad Request
 *              401:
 *                  description: unAuthorization
 *              500:
 *                  description: server error
 */


router.post("/get-otp", UserAuthController.getOTP)

/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: check otp value in user controller
 *          description : check one time password with code mobile
 *          parameters:
 *          -   name: mobile
 *              description: IR PhoneNumber
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: code
 *              description: enter sms code recived
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: bad Request
 *              401:
 *                  description: unAuthorization
 *              500:
 *                  description: server error
 *          
 */


router.post("/check-otp", UserAuthController.checkOTP)



module.exports = {
    UserAuthRoutes : router
}