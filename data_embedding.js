// how to get all posts by a single user if two dbs are there, 
// just make one array post in user object and put all post unique IDs in that array in that wy user will have all posts written by him

// data embedding - save all posts and content in user itself
// data referencing - give unique ids in user object and store post in other place

const express = require('express');
const app = express();
const userModel = require("./models/user-model-embedding");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.send("Server is up");
})

app.post("/create", async (req, res) => {
    let createdUser = await userModel.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    res.send(createdUser);
});

app.post("/:username/create/post", async (req, res) => {
    let user = await userModel.findOne({ username: req.params.username});
    user.posts.push({ content: "Hey its my second post pushed from array.push method"}); // this will add content to db but not save it
    user.save();          // so we will get the correct output but there will be nothing in the DB so user user.save() to save the changes
    res.send(user); 
})


app.listen(3000);
 