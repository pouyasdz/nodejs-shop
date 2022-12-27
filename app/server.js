const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const { Routers } = require("./router/router");
const createError = require("http-errors")
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");


module.exports = class Application {
    #app = express()
    #DB_URL;
    #PORT;
    constructor(PORT, DB_URL){
        this.#DB_URL = DB_URL;
        this.#PORT = PORT;
        this.configApplication();
        this.connectToMongoDB();
        this.createServer();
        this.createRoutes();
        this.errorHandling();
    }
    configApplication(){
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended:true}));
        this.#app.use(express.static(path.join(__dirname, "..", "public")))
        this.#app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc({
            swaggerDefinition : {
                info:{
                    title:"Electro Store",
                    version:"1.0.0",
                    description:"بزرگ ترین مرجع آموزش برنامه نویسی",
                    contact:{
                        name:"Pouya Sadeghzadeh",
                        url:"https://localhost:300",
                        email:"pouya.cc83@gmail.com"
                    }
                },
                servers : [
                    {
                        url : "http://localhost:5000"
                    }
                ],
            },
            // api patch
            apis : ['./app/router/**/*.js']
        })))
    }
    createServer(){
        this.#app.listen(this.#PORT,()=>{
            console.log("run > http://localhost:" + this.#PORT);
        })
    }
    connectToMongoDB(){
        mongoose.connect(this.#DB_URL, (error) => {
            if(!error) return console.log("connected to MongoDB");
            return console.log(error.message);
        })
        mongoose.connection.on("connected", ()=>{
            console.log("Mongodb Connection Successfull !");
        })

        process.on("SIGINT", ()=>{
            mongoose.connection.close();
            process.exit(0)
        })
    }
    errorHandling(){
        this.#app.use((req, res, next)=>{
           next(createError.NotFound(" آدرس مورد نظر یافت نشد "))
        })
        this.#app.use((error, req, res, next) => {
            const serverError = createError.InternalServerError()
            const statusCode = error.status || serverError.status;
            const message = error.message || serverError.message
            
            return res.status(statusCode).json({
                erros :{
                    statusCode,
                    message
                }
            })
        })
    }
    createRoutes(){
        this.#app.use(Routers)
    }
}
