const Joi = require('joi');
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/joitestdb");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        required: true
    },
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    age: {
        type: Number,
        min: 18,
        required: true
    },
    contact: {
        type: Number,
        min:10,
        required:true
    },
    email: {
        type: String
    }
});

function validateModel(data){
    let schema =  Joi.object({
        username: Joi.string().min(3).required(),
        name: Joi.string().min(3).required(),  
        email: Joi.string().email().required(),  // we can also use .custom with every field for custom validators to write custom msgs for each field
        age: Joi.number().min(19).required(),
        contact: Joi.number().required(),
    }).messages({          // this handles all msg that we send when error occurs in a specific field of object to make custom error msgs
        'string.email': "make sure email is correct"
    })

    let {error} = schema.validate(data);
    return error;
}

let userModel = mongoose.model("User", userSchema);
module.exports = {userModel, validateModel};