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

module.exports = Item = mongoose.model('records', RecordSchema)