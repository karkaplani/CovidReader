const fs = require('fs');
const csv = require('csv-parser');

const Recorder = require('./CovidRecord')

records = new Array

var id = 0

fs.createReadStream('covid19.csv') 
    .on('error', function(err) { console.log('covid19.csv file is missing!'); }) 
    .pipe(csv())
    .on('data', (row) => {
        //Storing the data in an object
        if(id <= 10) {
            var record = new Recorder(id, row.pruid, row.prname, row.prnameFR,
                row.date, row.numconf, row.numprob, 
                row.numdeaths, row.numtotal, row.numtoday);

            records.push(record);
        }
        id++
    })
    .on('end', () => {
        console.log('Values read!')
    })

module.exports = records

    
    
