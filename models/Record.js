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
        type: String,
    }, 
    prname: {
        type: String,
    }, 
    prnameFR: {
        type: String,
    }, 
    date: {
        type: String,
    }, 
    numconf: {
        type: String,
    }, 
    numprob: {
        type: String,
    }, 
    numdeaths: {
        type: String,
    }, 
    numtotal: {
        type: String,
    }, 
    numtoday: {
        type: String,
    }, 
})
//Will be used in the routes file to use the records collection in the database. 
module.exports = Document = mongoose.model('records', RecordSchema)