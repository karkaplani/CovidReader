/**
 * @author Abdullah Ilgun
 * The second module called by Node as the main module uses it.
 * It's The CRUD API for the application. All the GET, POST, PUT, DELETE
 * routes are made here by using Express framework. 
 */
const express = require('express')
const router = express.Router()
const Recorder = require('../../CovidRecord') //Data Transfer Object

//Calling the last module to get the records array to be used by the API
let records = require('../../FileReader')

/** GET(Read) route. Simply returns all the records array.  */
router.get('/', (req, res) => {
  res.json(records)
})

/**
 * The second GET route to return a record specified by an ID.
 * Uses the high-order array filter function for the array to have only
 * the specified element and returns that array.
 */
router.get('/:id', (req, res) => {
  res.json(records.filter(record => record.id === parseInt(req.params.id)))
}) 

/**
 * DELETE route. Similar, yet as oppose to the second GET route, filters the
 * array with the ID specified element, and returns the array with the other elements.
 */
router.delete('/:id', (req, res) => {
  records = records.filter(record => record.id !== parseInt(req.params.id))
  res.json(records)
})

/** POST(Create) route. Simply stores the data taken in a DTO and pushes to the records array */
router.post('/', (req, res) => {
  const newRecord = new Recorder(parseInt(req.body.id), req.body.pruid, req.body.prname, req.body.prnameFR, req.body.date, 
                                   req.body.numconf, req.body.numprob, req.body.numdeaths, req.body.numtotal, req.body.numtoday)
  records.push(newRecord)
  res.json(records)
})

/**
 * PUT(Update) route. First, it gets the request body, then loops through 
 * the records array to find the element that' requested by ID, and looks
 * whether the certain elements' values are different in the request's body.
 * If different, replaces with the new value, if not keeps the current value.
 */
router.put('/:id', (req, res) => {
  const updatedRecord = req.body
  records.forEach(record => {
    if(record.id === parseInt(req.params.id)) {
      record.pruid = updatedRecord.pruid ? updatedRecord.pruid : record.pruid
      record.prname  = updatedRecord.prname ? updatedRecord.prname : record.prname
      record.prnameFR  = updatedRecord.prnameFR ? updatedRecord.prnameFR : record.prnameFR
      record.date  = updatedRecord.date ? updatedRecord.date : record.date
      record.numconf  = updatedRecord.numconf ? updatedRecord.numconf : record.numconf
      record.numprob  = updatedRecord.numprob ? updatedRecord.numprob : record.numprob
      record.numdeaths  = updatedRecord.numdeaths ? updatedRecord.numdeaths : record.numdeaths
      record.numtotal  = updatedRecord.numtotal ? updatedRecord.numtotal : record.numtotal
      record.numtoday  = updatedRecord.numtoday ? updatedRecord.numtoday : record.numtoday

      res.json(records)
    }
  })
})

module.exports = router