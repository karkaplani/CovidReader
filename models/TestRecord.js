const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TestSchema = new Schema({
    name: {
        type: String
    },
    age: {
        type: String
    }
})

module.exports = TestDocument = mongoose.model('test', TestSchema)