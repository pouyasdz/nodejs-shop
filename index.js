const Application = require("./app/server");
const dontenv = require("dotenv")
dontenv.config()

new Application(5000, "mongodb://0.0.0.0:27017/shop")