/**
 * @author Abdullah Ilgun (Apo)
 * The last module to be called in backend. Read the CSV file
 * and stores the first 100 records in an array of DTOs, and 
 * returns the array to be used by the routes file. 
 */
const fs = require('fs')
const csv = require('csv-parser')

const Recorder = require('./CovidRecord')

let records = new Array

let id = 0 //To prevent all records to be stored in the array.

fs.createReadStream('covid19.csv') 
  .on('error', function(err) { console.log('covid19.csv file is missing!') }) 
  .pipe(csv())
  .on('data', (row) => {
    //Storing the data in an object. 
    if(id <= 99) { //To store only the first 100 records
      var record = new Recorder(id, row.pruid, row.prname, row.prnameFR,
                                    row.date, row.numconf, row.numprob, 
                                    row.numdeaths, row.numtotal, row.numtoday)
      records.push(record)
    }
      id++
    })
    .on('end', () => {
      console.log(`First ${records.length} values read!`)
    })

module.exports = records

    
    
