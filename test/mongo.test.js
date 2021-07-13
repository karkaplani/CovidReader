/**
 * @author Abdullah Ilgun (Apo)
 * Testing the MongoDB connectivity using a mock collection(Table).
 * Connection is made here, and so far only whether a new document
 * (record) can be added to the collection is tested. This case
 * also uses mocha-chai framework. 
 */

const mongoose = require('mongoose')
const db = require('../config/keys').mongoURI //Database is the same

const Record = require('../models/TestRecord') //Collection is mock

const chai = require('chai')
chai.should()

describe('Mongo connection', () => {

  before(() => {
    mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
      .then(() => console.log("Connected"))
      .catch((err) => console.log(err))
  })

  //The collection should be refreshed before each test unit
  //in case new test cases wanted to be added.
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