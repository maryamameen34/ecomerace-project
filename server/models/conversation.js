const mongoose = require("mongoose")


const groupConverstaion = new mongoose.Schema({
    groupName : {
        type: String
    },
    members : {
        type : Array 
    },
    lastMessage : {
        type : String 
    },
    lastMessasgeId : {
        type : String
    },
    admins : {
        type : Array
    }
} , {timestamps : true})


module.exports = mongoose.model("GroupConversation" , groupConverstaion)