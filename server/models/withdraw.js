const mongoose = require("mongoose")


const withdrawSchema = new mongoose.Schema({
    seller : {
        type : mongoose.Schema.Types.ObjectId ,
        require: true
    },
    amount : {
        type : String ,
        requried: true
    },
    status: {
        type : String ,
        default : "Processing"
    }
} , {timestamps : true})

module.exports = mongoose.model("withdraw" , withdrawSchema)