const mongoose = require('mongoose')
const Schema = mongoose.Schema

constuser = require('../models/user.model')

const userSchema = new Schema (
    {
        email: {type: String, required: true, unique: true},
        entries: [{type: Schema.Types.ObjectId, ref: 'Entry'}]
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema)

module.exports = User