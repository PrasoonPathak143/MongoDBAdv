// how to get all posts by a single user if two dbs are there, 
// just make one array post in user object and put all post unique IDs in that array in that wy user will have all posts written by him

// data embedding - save all posts and content in user itself
// data referencing - give unique ids in user object and store post in other place

const express = require('express');
const app = express();
const userModel = require("./models/user-model-referencing");
const postModel = require("./models/post-model");

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
    let createdPost = await postModel.create({
        content: "Hello guys, my first post in reference",
        user: user._id
    });
    user.posts.push(createdPost._id);
    await user.save();
    res.send({user, createdPost}); 
})

// data population

app.get("/posts", async (req, res) => {
    let posts = await postModel.find().populate("user");
    res.send(posts);
})

app.get("/users", async (req, res) => {
    let users = await userModel.find().populate("posts");
    res.send(users);
})

// embedding -> data size me kam in future as well, data rarely change, data access fast ho jati h, quickly load
// referencing -> frequently change, size bada

// eg -> we can ask for posts only as they can seperately exist from user so referencing
// but comments on a post is attached to post, we need post to see comment so embedding can be used

app.listen(3000);
 