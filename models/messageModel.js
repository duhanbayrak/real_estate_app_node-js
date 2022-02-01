const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    name:           { type: String, require: true },
    email:          { type: String, require: true },
    phone:          { type: String, require: true },
    message:        { type: String, require: true },
    date:           { type:Date, default:Date.now }


});

module.exports = mongoose.model("MessageModel", messageSchema);

