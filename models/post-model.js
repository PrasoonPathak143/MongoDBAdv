// for referencing
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/testingDBReferencePost");

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: String,
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Post", postSchema);