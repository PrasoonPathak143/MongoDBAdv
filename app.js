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

// not equal => ne
// less than => le
// less than and equal => lte
// greater than => gt
// greater than and equal => gte


app.listen(3000);