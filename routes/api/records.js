const express = require('express')
const router = express.Router()
const recordsToDisplay = ('../../CovidReader.js')

//Getting all the records
router.get('/', (req, res) => {
    res.json(recordsToDisplay)
})

//Getting a specific element by id
router.get('/:id', (req, res) => {
    res.json(recordsToDisplay.filter(record => record.id === parseInt(req.params.id)))
}) 