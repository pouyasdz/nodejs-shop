const homeController = require("../../http/controller/api/home.controller");
const { VerifyAccessToken } = require("../../http/middlewares/verifyAccessToken");

const router = require("express").Router()

/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description: get all need data for index page
 */


/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes
 *      tags: [IndexPage]
 *      description: get all need data for index page
 *      parameters:
 *          - in: header
 *            name: access-token
 *            example: Berare YourToken
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: notFound
 */


router.get("/", VerifyAccessToken,homeController.indexpage)

module.exports= {
    HomeRouter : router
}