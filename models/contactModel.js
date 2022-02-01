const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    address:    { type: String, require: true },
    tel:        { type: String, require: true },
    mail:       { type: String, require: true },
    instagram:  { type: String, require: true },
    twitter:    { type: String, require: true },
    facebook:   { type: String, require: true },
    linkedin:   { type: String, require: true },
});

module.exports = mongoose.model("Contact",contactSchema);

