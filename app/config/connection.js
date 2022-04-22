const mongoose = require("mongoose");
var local = "mongodb://localhost:27017/demo1";
var url = "mongodb://localhost:27017/yogix";


var credencials = {
    authSource: "admin",
    user: "milanyogix",
    pass: "Milan2609"
};
mongoose.connect(local).then(() => {
    console.log("db connection successful");
}).catch((error) => {
    console.log("db connection failed");
    console.log(error);
});