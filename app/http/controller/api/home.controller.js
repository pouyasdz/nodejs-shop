const createHttpError = require("http-errors");
const authSchema = require("../../validators/user/auth.schema");
const Controller = require("../controller");

module.exports = new class HomeController extends Controller{
   async indexpage(req, res, next){
      try {
         return res.status(200).send("this is index page ...")
      } catch (error) {
         next(error)
      }
   }
}