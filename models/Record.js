/**
 * @author Abdullah Ilgun (Apo)
 * Model component to add a bit of structure to the database as well as
 * making manipulations on it using Mongoose library. 
 * 
*/
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecordSchema = new Schema({
    pruid: {
        type: Number,
        required: true
    }, 
    prname: String, 
    prnameFR: String,
    date: String,
    numconf: Number,
    numprob: Number,
    numdeaths: Number,
    numtotal: Number,
    numtoday: Number,
})
//Will be used in the routes file to use the records collection in the database. 
module.exports = Document = mongoose.model('records', RecordSchema)