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
       var record = new Recorder(row.pruid, row.prname, row.prnameFR,
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
            recordsToDisplay[i].displayValues();
        }
        
    });

app.get('/api/records', (req, res) => {
    
    res.json(recordsToDisplay)
})

//Default port is 5000, and if the server doesn't start on 5000, logs which port it started
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
console.log('\nBy Abdullah Zeki Ilgun')
