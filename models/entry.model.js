const mongoose = require('mongoose')
const Schema = mongoose.Schema

const entry = require('../models/entry.model')

const entrySchema = new Schema (
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        profession: {type: String, required: true},
        date: {type: Date, required: true},
        owner: {type: Schema.Types.ObjectId, ref: 'User'},
    },
    {
        timestamps: true,
    }
)

const Entry = mongoose.model('Entry', entrySchema)

module.exports = Entry