const Controller = require("../controller");

module.exports = new class HomeController extends Controller{
   indexpage(req, res, next){
    return res.status(200).send("Index Page Store")
   }
}