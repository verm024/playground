const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: [true, "Email must be unique!"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    name: {
        type: String,
        required: [true, "Name is required!"]
    },
    username: {
        type: String,
        required: [true, "Username is required!"],
        unique: [true, "Username must be unique!"]
    },
    role: {
        type: String,
        default: "user"
    }
});

let User = mongoose.model("user", userSchema);

module.exports = User;