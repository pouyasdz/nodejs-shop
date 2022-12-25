const { HomeRouter } = require("./api")
const { UserAuthRoutes } = require("./users/auth")

const router = require("express").Router()

router.use("/", HomeRouter)
router.use("/user", UserAuthRoutes)

module.exports = {Routers : router}