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
 *  /user/login:
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


router.post("/login", UserAuthController.getOTP)


module.exports = {
    UserAuthRoutes : router
}