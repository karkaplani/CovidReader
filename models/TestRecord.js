/**
 * @author Abdullah Ilgun (Apo)
 * This model is for the mock collection which is
 * for testing the Database connection. Used in the
 * mongo.test file.
*/
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