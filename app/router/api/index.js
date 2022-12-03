const homeController = require("../../http/controller/api/home.controller")

const router = require("express").Router()

router.get("/", homeController.indexpage);

module.exports= {
    HomeRouter : router
}