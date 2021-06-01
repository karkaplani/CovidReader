/**
 * @author Abdullah Ilgun (Apo)
 * This class reads the data from the file using a parsing library, stores the records in 
 * data transfer objects, and the objects in an array, then displays the first 10 records 
 * on the browser using Express framework.
 */

//Imports
const Recorder = require('./CovidRecord'); //DTO

//Basic libraries in NPM package
const fs = require('fs');
const csv = require('csv-parser');

const express = require('express'); 
const app = express();

var records = new Array; 
var recordsToDisplay = new Array;

fs.createReadStream('covid19.csv') 
    .on('error', function(err) { console.log('covid19.csv file is missing!'); }) //Error handling in case of the file's missing
    .pipe(csv())
    .on('data', (row) => {
        //Storing the data in an object
       var record = new Recorder(row.id, row.pruid, row.prname, row.prnameFR,
            row.date, row.numconf, row.numprob, 
            row.numdeaths, row.numtotal, row.numtoday);

        records.push(record);
    })
    .on('end', () => {
        //Only the first few records are required so the required rows are stored in another array. 
        //That cannot be done outside of here as node proceeds this before populating the object, thus
        //the objects seem empty otherwise. 
        for(let i = 0; i <= 10; i++) {
            recordsToDisplay.push(records[i]);
            recordsToDisplay[i].id = i; //Given id to each record
            recordsToDisplay[i].displayValues();
        }
        
    });

//Getting all the records
app.get('/api/records', (req, res) => {
    res.json(recordsToDisplay)
})

//Getting a specific record by id
app.get('/api/records/:id', (req, res) => {
    res.json(recordsToDisplay.filter(record => record.id === parseInt(req.params.id)))
}) 

//Body parder middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Adding a record
app.post('/api/records', (req, res) => {

    const newRecord = new Recorder(req.body.id, req.body.pruid, req.body.prname, req.body.prnameFR, req.body.date, 
                                   req.body.numconf, req.body.numprob, req.body.numdeaths, req.body.numtotal, req.body.numtoday)
    recordsToDisplay.push(newRecord)
    res.json(recordsToDisplay)
})

//Updating a record
app.put('/api/records/:id', (req, res) => {
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

            res.json({msg: "Record updated", record})
        }
    })
})

//Deleting a record
app.delete('/api/records/:id', (req, res) => {
    res.json(recordsToDisplay.filter(record => record.id !== parseInt(req.params.id)))
})

//Default port is 5000, and if the server doesn't start on 5000, logs which port it started
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
console.log('\nBy Abdullah Zeki Ilgun')