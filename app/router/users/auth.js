const { UserAuthController } = require("../../http/controller/users/auth/auth.controller")

const router = require("express").Router()

router.post("/login", UserAuthController.login)


module.exports = {
    UserAuthRoutes : router
}