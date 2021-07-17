const User = require('../models/user.model')

exports.handler = async function (event, context) {
    const commandArray = event.path.split("/")
    let userEmail = commandArray.pop()
    let command = commandArray.pop()

    const express = require('express')
    const mongoose = require("mongoose")
    var app = express()
    app.use(cors())
    app.use(express.json())
    
    mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })



    if (command === "get-by-email") {
        app.get((userEmail, res) => {
            User.findOne({email: userEmail})
            .then((user) => res.json({message: "Got user with email that was passed in", response: user,}))
            .catch((err) => res.status(400).json({message:"Error: could not get user with given email", response:err,}))
        })
        //GET user via email
    }
    else if (command === "entries-with-email"){
        const response = {
            statusCode: 200,
            body: JSON.stringify('Get entries with an email'),
        };
        return response;
        //GET user entries via email
    }
    else if (userEmail === "create-user") {
        const response = {
            statusCode: 200,
            body: JSON.stringify('Create User'),
        };
        return response;
        //POST new user
    }
    

}