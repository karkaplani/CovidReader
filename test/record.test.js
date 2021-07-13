/**
 * @author Abdullah Ilgun (Apo)
 * Integrated API test cases with Mocha framework and Chai library. 
 * Cases directly test the routes' on the actual database instead 
 * of mocking it. Though at the end nothing is changed in the database.
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../Server') 

chai.should()
chai.use(chaiHttp)

const Record = require('../models/Record')

describe('Records API', () => {

  /**Get */
  describe('GET /api/records', () => {
    it('It should get all the records', (done) => {
      chai.request(server)
        .get('/api/records')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
        done()
        })
    })
  })

  /**Get with ID */
  describe('GET /api/records:id', () => {
    it('It should get a record by ID', (done) => {
      
      let mockRecordId
      //First a random record should be found to get its ID
      //since MongoDB doesn't have IDs represented by simple 
      //numbers that can be predicted.
      Record.findOne()
        .then(record => mockRecordId = record._id).catch(err => console.log(err))
        .then(() => {
          chai.request(server) 
            .get('/api/records/'+mockRecordId)
            .end((err, res) => {
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.should.have.property('_id')
              done()
          })
        }).catch(err => console.log(err))
    })
  })

  /**Post */
  describe('POST /api/records', () => {
    it('It should add a new record', (done) => {
      //In this method we're creating a new record, but it will be
      //deleted in the next test case.
      const newRecord = {"pruid": 31}
      chai.request(server)
        .post('/api/records/')
        .send(newRecord)
        .end((err, res) => {
          res.should.have.status(200)
          const response = res.body.filter(record => record.pruid == 31)[0]
          console.log("Inserted document ID: " + response._id)
          response.should.have.property('pruid').eq('31')
          done()
        })
    })
  })

  /**Delete */
  describe('DELETE /api/records:id', () => {
    it('It should delete a record by ID', (done) => {

      let mockRecordId //Same idea as the get with ID unit

      //In this case, the last added record should be found  
      //and deleted to keep the database unchanged after the
      //test cases are run.
      Record.findOne().sort({'_id':-1}).limit(1)
        .then(record => mockRecordId = record._id).catch(err => console.log(err))
        .then(() => {
          chai.request(server) 
            .delete('/api/records/' + mockRecordId)
            .end((err, res) => {
              console.log("Deleted document ID: " + mockRecordId)
              res.should.have.status(200)
              res.body.forEach(element => {
                element.should.have.property('_id').not.eq(mockRecordId)
              });
              done()
          })
        }).catch(err => console.log(err))
    })
  })
})
