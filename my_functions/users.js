const User = require('../models/user.model')
const cors = require('cors')
const express = require('express')
const mongoose = require("mongoose")
const dotenv = require('dotenv')


exports.handler = async function (event, context) {
    dotenv.config()
    const app = express()
    const port = process.env.PORT || 5000

    app.use(cors())
    app.use(express.json())

    mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })

    const connection = mongoose.connection
    connection.once('open', () => {
        console.log('MongoDB connection established successfully')
    })

    app.get('/', (req, res) => {
        res.send('Node.js & Express are working. ')
    })

    //insert routes here
    const entryRouter = require('./routes/entry')
    const userRouter = require('./routes/user')

    app.use('/entries', entryRouter)
    app.use('/users', userRouter)

    app.listen(port, () => {
        console.log(`Server is running on port: ${PORT}`)
    })

module.exports = app

}