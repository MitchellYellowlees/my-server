const router = require('express').Router()
const User = require('../models/user.model')
const Entry = require('../models/entry.model')

// Post Routes

// creating a new entry
router.route('/create-entry').post((req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const profession = req.body.profession
    const date = req.body.date
    const owner = req.body.owner

    const newEntry = new Entry({
        firstName,
        lastName,
        profession,
        date,
        owner,
    })

    newEntry.save()
    .then((newEntry) => {
        // adding entry to owner's entry array
        User.findByIdAndUpdate({ _id: owner }, { $addToSet: { entries: newEntry._id }}, { new: true })
        .then((user) => res.json({ message: 'Entry saved to the database', reponse: newEntry,}))
        .catch((err) => res.status(400).json({ message: 'Error: could not save new entry', response: err }))
    })
})

module.exports = router