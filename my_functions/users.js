const User = require('../models/user.model')


const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

//requiring dotenv
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// connect to mongoDB atlas
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })

const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB connection established successfully')
})

exports.handler = async function (event, context) {
    
    const router = require('express').Router()
    

    
    
    router.route('/create-user').post((req, res) => {
        const email = req.body.email
    
        const newUser = new User({
            email,
        })
    
        newUser
        .save()
        .then((user) => res.json({ message: 'User created', response: user }))
        .catch((err) => res.status(400).json({ message: 'Error: could not create user', response: err }))
    })
    router.route('/get-by-email/:email').get((req, res) => {
        User.findOne({ email: req.params.email })
        .then((user) => res.json({ message: 'Got user with email that was passed in', response: user}))
        .catch((err) => res.status(400).json({ message: 'Error: could not get user with the provided email', response: err,}))
    })
    router.route('/get/entries-with-email/:email').get((req, res) => {
        User.findOne({ email: req.params.email })
        .populate('entries')
        .exec()
        .then((user) =>
        res.json({
            message: 'Got entries from user email',
            response: user.entries,
        }))
        .catch((err) => {
            res.status(400).json({
                message: 'Error: could not get user with given email',
                response: err,
            })
        })
    })
    

}