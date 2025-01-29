const express = require('express');
const app = express();
const userModel = require("./models/user");
const users = require('./utils/dummyusers');

app.get("/", (req, res) => {
    res.send("Hello");
})

app.get("/create-many", async (req, res) => {
    let data = await userModel.insertMany(users);
    res.send(data);
})

app.get("/userEqual/:age", async (req, res) => {
    let data = await userModel.find({age: {$eq: req.params.age}});
    res.send(data);
})

app.get("/regex", async (req, res) => {
    let data = await userModel.find({name: {$regex: /^m.*or$/i}})
    res.send(data);
})

// not equal => ne
// less than => le
// less than and equal => lte
// greater than => gt
// greater than and equal => gte
// among a given array values matching => $in: [pass values]
// not in operator => nin
// a specific field exists for those users => ({isAdmin: {$exists: true}})
// and operator => {$and: [{isMarried: false}, {age: {$gte: 30}}]}
// or operator => {$or: [{isMarried: false}, {age: {$gte: 30}}]}
// regex => $regex: / query /

app.listen(3000);