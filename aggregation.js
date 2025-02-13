const express = require('express');
const app = express();
const userModel = require("./models/user-model-aggregation");
const postModel = require("./models/post-model-aggregation");
const usersData = require('./utils/user-data-aggregation');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.send("Server is up");
})

app.post("/create/data", async (req, res) => {
    let insertedUsers = await userModel.insertMany(usersData);
    console.log(insertedUsers);
    const posts = [
        { title: "Mongoose Basics", content: "Introduction to Mongoose", author: insertedUsers[0]._id },
        { title: "Understanding MongoDB", content: "How MongoDB works", author: insertedUsers[1]._id },
        { title: "Node.js for Beginners", content: "Getting started with Node.js", author: insertedUsers[2]._id },
        { title: "Async/Await in JavaScript", content: "Deep dive into async/await", author: insertedUsers[3]._id },
        { title: "Express.js Routing", content: "How to set up routes in Express", author: insertedUsers[4]._id },
        { title: "React vs Angular", content: "Comparing front-end frameworks", author: insertedUsers[0]._id },
        { title: "Database Indexing", content: "How indexing improves performance", author: insertedUsers[1]._id },
        { title: "REST APIs with Express", content: "Building APIs with Node.js", author: insertedUsers[2]._id },
        { title: "Authentication in Node.js", content: "Using JWT for authentication", author: insertedUsers[3]._id },
        { title: "MongoDB Aggregations", content: "Powerful queries in MongoDB", author: insertedUsers[4]._id }
    ];
    let insertedPosts = await postModel.insertMany(posts);
    console.log(insertedPosts);
    res.send({insertedUsers, insertedPosts});
})

app.get("/match", async (req, res) => {
    // let users = await userModel.find({name: "Alice Johnson"});
    // same thing in aggregation way
    let users = await userModel.aggregate([
        // query1, query2, query3 ....
        { $match: { age: 28 }},
    ])
    res.send(users);
})

app.get("/group", async (req, res) => {
    // let users = await userModel.find({name: "Alice Johnson"});
    // same thing in aggregation way
    let users = await userModel.aggregate([
        // query1, query2, query3 ....
        { $group: { 
            _id: "$age",        // group based on which characterstic
            names: {$push: "$name"},    // data that you want to push with age
            user: {$push: "$$ROOT"}     // to get the full document
        }},
    ])
    res.send(users);
})

// .populate is related to mongoose not mongodb -- lookup help in other things like mongo driver

app.get("/lookup", async (req, res) => {
    let posts = await postModel.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "authordata"
            }
        }
    ])
    res.send(posts);
})

app.get("/project", async (req, res) => {   // what fields you need in output, mark them as 1
    let users = await userModel.aggregate([
        {
            $project: {
                name: 1,
                age: 1,
                fullName: "$email"  // some other field name for email
            }
        }
    ])
    res.send(users);
})

app.get("/unwind", async (req, res) => {
    let users = await userModel.aggregate([
        {
            $unwind: "$tags"   // open the array or unwind for any specific field
        }
    ])
    res.send(users);
})

// questions - 1 -> find all posts authored by "Alice Johnson"
app.get("/question1", async (req, res) => {
    let ans = await postModel.aggregate([
        {$lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "authorName"
        }},
        {
            $unwind: "$authorName" 
        },
        // {
        //     $group: {
        //         _id: "$authorName",
        //         posts: {$push: "$$ROOT"},
        //         name: {$first: "$authorName.name"}

        //     }
        // },
        {
            $match: {
                "authorName.name": "Alice Johnson"
            }
        }
    ])

    res.send(ans);
})

// Question-2 -> have author name and email in the post list
app.get("/question2", async (req, res) => {
    let ans = await postModel.aggregate([
        {$lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "authorName"
        }},
        {
            $unwind: "$authorName" 
        },
        {
            $project: {
                title:1,
                content:1,
                "authorName.name": 1,
                "authorName.email": 1
            }
        }
    ])

    res.send(ans);
})



app.get("/posts", async (req, res) =>{
    let posts = await postModel.find().populate("author");
    res.send(posts);
})

app.listen(3000);
 