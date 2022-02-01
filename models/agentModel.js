const mongoose = require("mongoose");


const AgentSchema = new mongoose.Schema({
   
    firstName: {
        type:String, 
        require: true, 
    },
    lastName:{
        type:String,
        require: true
    },
    phone:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true
    },
    about:{
        type:String,
        require: true
    },
    agentImage:{
        type:String,
        require: true
    },
    date:{
        type:Date,
        default:Date.now
    }
});




module.exports = mongoose.model("AGENT",AgentSchema);