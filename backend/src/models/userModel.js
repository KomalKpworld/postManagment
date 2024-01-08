const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
    },
}, { timestamps: true });
module.exports = mongoose.model('users', userSchema)