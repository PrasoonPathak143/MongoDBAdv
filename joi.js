const express = require('express');
const app = express();
const {userModel, validateModel} = require("./models/user-model");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.send("Server is up");
})

// we can use phind AI to write detailed schema and joi schema

app.post("/create", async (req, res) => {
    let {name, username, age, contact, email} = req.body;  // destructuring of data
    let error = validateModel({name, username, age, contact, email});

    if(error){
        return res.status(500).send(error.message);
    }

    res.send("Everything worked");
})

app.listen(3000);
 