const mongoose = require("mongoose");
const subSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});


const Sub = new mongoose.model("Subscribe", subSchema);

module.exports = Sub;