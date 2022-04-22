const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
});

// userSchema.pre("save", async function(next) {
//     this.password = await bcrypt.hash(this.password, 10);
//     this.confirmpassword = undefined;
//     next();
// })

const User = new mongoose.model("User", userSchema);

module.exports = User;