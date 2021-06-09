const express = require('express')
const router = express.Router()
const Recorder = require('../../CovidRecord'); //DTO

var recordsToDisplay = require('../../RecordsToDisplay')
//console.log("\n" +  JSON.stringify(recordsToDisplay)) //Prints undefined

//Adding a record
router.post('/', (req, res) => {

    const newRecord = new Recorder(parseInt(req.body.id), req.body.pruid, req.body.prname, req.body.prnameFR, req.body.date, 
                                   req.body.numconf, req.body.numprob, req.body.numdeaths, req.body.numtotal, req.body.numtoday)
    recordsToDisplay.push(newRecord)
    res.json(recordsToDisplay)
})

//Updating a record
router.put('/:id', (req, res) => {
    const updatedRecord = req.body
    recordsToDisplay.forEach(record => {
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

            res.json(recordsToDisplay)
        }
    })
})

//Deleting a record
router.delete('/:id', (req, res) => {
    recordsToDisplay = recordsToDisplay.filter(record => record.id !== parseInt(req.params.id))
    res.json(recordsToDisplay)
})

//Getting a specific record by id
router.get('/:id', (req, res) => {
    res.json(recordsToDisplay.filter(record => record.id === parseInt(req.params.id)))
}) 

//Getting all the records
router.get('/', (req, res) => {
    res.json(recordsToDisplay)
})

module.exports = router