const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/testingDbAggregation");

const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    createdAt: { type: Date, default: Date.now },
    tags: [String]
})

module.exports = mongoose.model("User", userSchema);