const mongoose = require("mongoose")


const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: "Running"
    },
    tags: {
        type: String,
    },
    originalPrice: {
        type: Number
    },
    discountPrice: {
        type: Number,
        required: true
    },
    stock: {
        type: Number
    },
    images : [
        {
            type : String 
        }
    ],
    venderId : {
        type : String ,
    },
    shop : {
        type : mongoose.Schema.Types.ObjectId 
    },
    sold_out : {
        type : Number ,
        default : 0
    }
} , {timestamps : true})


const Event = mongoose.model("Event" , EventSchema)
module.exports = Event