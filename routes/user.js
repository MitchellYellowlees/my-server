const router = require('express').Router()
const User = require('../models/user.model')
const Entry = require('../models/entry.model')

// Post Routes

// creating a new user
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

// Get Routes

// getting all users (for testing purposes)
router.route('/').get((req, res) => {
    User.find()
    .then((users) => res.json({ message: 'Got all users in DB', response: users }))
    .catch((err) => res.status(400).json({ message: 'Error: could not get all users', response: err }))
})

// getting a specific user via user ID
router.route('/get/:id').get((req, res) => {
    User.findById(req.params.id)
    .then((user) => res.json({ message: 'Got user with ID that was passed in', response: user,}))
    .catch((err) => res.status(400).json({ message: 'Error: could not get user with ID that was passed in', response: err,}))
})

// getting a specific user via email
router.route('/get-by-email/:email').get((req, res) => {
    User.findOne({ email: req.params.email })
    .then((user) => res.json({ message: 'Got user with email that was passed in', response: user}))
    .catch((err) => res.status(400).json({ message: 'Error: could not get user with the provided email', response: err,}))
})

// getting a user's entries via user ID
router.route('/get/entries/:id').get((req, res) => {
    User.findById(req.params.id)
    .populate('entries')
    .exec()
    .then((user) => res.json({ message: 'Got all entries for given user ID', response: user.entries, }))
    .catch((err) => { res.status(400).json({ message: 'Error: could not get all entries with given user ID', response: err, })})
})

// getting a user's entries via email
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

module.exports = router