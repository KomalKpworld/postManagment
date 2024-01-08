const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    body: {
        type: String,
    },
    created_by: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    },
    geo_location:
        [{
            latitude: {
                type: String
            },
            longitude: {
                type: String
            }
        }],
}, { timestamps: true });
module.exports = mongoose.model('post', postSchema)