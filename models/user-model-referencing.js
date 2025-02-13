const mongoose = require('mongoose');

// mongoose.connect("mongodb://127.0.0.1:27017/testingDBReferencePost");

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    posts: [
       {type: mongoose.Schema.Types.ObjectId, ref: "Post"}
    ]
})

module.exports = mongoose.model("User", userSchema);