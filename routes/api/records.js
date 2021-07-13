/**
 * @author Abdullah Ilgun
 * The second module called by Node as the main module uses it.
 * It's The CRUD API for the application. All the GET, POST, PUT, DELETE
 * routes are made here by using Express framework. 
 */
const express = require('express')
const router = express.Router()

//Record model
const Record = require('../../models/Record')

/** GET(Read) route. Simply returns all the records array.  */
router.get('/', (req, res) => {
  Record.find()
    .then(cases => res.json(cases))
})

/**
 * The second GET route to return a record specified by an ID.
 * Uses the high-order array filter function for the array to have only
 * the specified element and returns that array.
 */
router.get('/:id', async(req, res) => {
  Record.findById(req.params.id)
    .then(cases => res.json(cases))
}) 

/**
 * DELETE route. Similar, yet as oppose to the second GET route, filters the
 * array with the ID specified element, and returns the array with the other elements.
 */
router.delete('/:id', (req, res) => {
  Record.findById(req.params.id)
    .then(record => record.remove()
    .then(() => {
      Record.find()
      .then(cases => res.json(cases))
    }))
})

/** POST(Create) route. Simply stores the data taken in a DTO and pushes to the records array */
router.post('/', (req, res) => {
  const newRecord = new Record(req.body)
  newRecord.save()
  .then(() => {
    Record.find()
    .then(cases => res.json(cases))
  })
})

/**
 * PUT(Update) route. First, it gets the request body, then loops through 
 * the records array to find the element that' requested by ID, and looks
 * whether the certain elements' values are different in the request's body.
 * If different, replaces with the new value, if not keeps the current value.
 */
router.patch('/:id', (req, res) => {
  Record.updateOne(
    {_id: req.params.id},
    {$set: req.body}
  )
  .then(() => {
    Record.find()
    .then(cases => res.json(cases))
  })
})

module.exports = router