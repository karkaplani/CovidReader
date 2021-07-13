const mongoose = require('mongoose')
const db = require('../config/keys').mongoURI

const Record = require('../models/TestRecord')

const chai = require('chai')
chai.should()

describe('Mongo connection', () => {

  before(() => {
    mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
      .then(() => console.log("Connected"))
      .catch((err) => console.log(err))
  })

  beforeEach(() => {
    Record.deleteMany({})
      .then(() => {
        console.log("All records deleted")
    })
  })

  describe('Inserting new document', () => {
    it('It should insert the new record', () => {
      const newRecord = new Record({"name": "Apo", "age": "20"})
      newRecord.save()
      .then(() => {
          Record.find()
            .then(docs => {
                docs.should.be.a('array')
                docs[0].name.should.be.eq('Apo')
            }).catch((err) => console.log(err))
      }).catch((err) => console.log(err))
    })
  })
})