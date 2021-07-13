/**
 * @author Abdullah Ilgun
 * The second module called by Node as the main module uses it.
 * It's The CRUD API for the application. All the GET, POST, PATCH, 
 * and DELETE outes are made here by using Express framework. 
 * All the 
 */

const express = require('express')
const router = express.Router()

//Object to update the Database. Used in all routes.
const Records = require('../../models/Record')

/** GET(Read) route. Simply returns all the records array.  */
router.get('/', (req, res) => {
  Records.find()
    .then(records => res.json(records))
})

/**
 * The second GET route to return a record specified by an ID.
 * Used in frontend to update or delete the specified record.
 */
router.get('/:id', async(req, res) => {
  Records.findById(req.params.id)
    .then(cases => res.json(cases))
}) 

/**
 * DELETE route. First finds the specified element by ID and removes,
 * then returns all the records to the table in frontend. The table
 * is updated according to the response of that route.
 */
router.delete('/:id', (req, res) => {
  Records.findById(req.params.id)
    .then(record => record.remove()
    .then(() => {
      Records.find()
      .then(cases => res.json(cases))
    }))
})

/** 
 * POST(Create) route. Simply creates a new record using the model, 
 * saves to the Database and returns all the records to the table in 
 * frontend. The table is updated according to the response of that route.
*/
router.post('/', (req, res) => {
  const newRecord = new Records(req.body)
  newRecord.save()
  .then(() => {
    Records.find()
    .then(cases => res.json(cases))
  })
})

/** 
 * PATCH(Update) route. After updating the records, returns all 
 * the records to the table in frontend. The table is updated 
 * according to the response of that route.
 * To update, PATCH is used instead of PUT because the record is
 * only modified rather than putting a whole new record. 
*/
router.patch('/:id', (req, res) => {
  Records.updateOne(
    {_id: req.params.id},
    {$set: req.body}
  )
  .then(() => {
    Records.find()
    .then(cases => res.json(cases))
  })
})

module.exports = router