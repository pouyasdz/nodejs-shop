const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const { Routers } = require("./router/router");

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
            return res.status(404).json({
                statusCode: 404,
                message:"آدرس مورد نظر یافت نشد"
            })
        })
        this.#app.use((error, req, res, next) => {
            const statusCode = error.status || 500;
            const message = error.message || "InternalServerError";
            
            return res.status(statusCode).json({
                statusCode,
                message
            })
        })
    }
    createRoutes(){
        this.#app.use(Routers)
    }
}
