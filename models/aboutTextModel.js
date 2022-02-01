const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
    aboutText:   { type: String, require: true }
});

module.exports = mongoose.model("AboutText",aboutSchema);

