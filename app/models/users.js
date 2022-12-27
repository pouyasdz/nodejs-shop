const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    first_name:{type:String},
    last_name:{type:String},
    username:{type:String, lowerCase:true},
    mobile:{type:String, required: true},
    email:{type:String, lowerCase:true},
    password:{type:String},
    otp:{type:Object, default:{
        code:0,
        expiresIn : 0
    }},
    bills:{type:[], default:[]},
    discount:{type:Number, default:0},
    birthday:{type:String},
    Roles:{type:[String], default:["USER"]}
})

module.exports = {
    userModel:mongoose.model("user", Schema)
}