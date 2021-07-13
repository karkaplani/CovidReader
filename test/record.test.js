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

      Record.findOne()
        .then(anan => mockRecordId = anan._id).catch(err => console.log(err))
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
      const newRecord = {"pruid": 31}
      chai.request(server)
        .post('/api/records/')
        .send(newRecord)
        .end((err, res) => {
          res.should.have.status(200)
          console.log("Inserted document ID: " + res.body.filter(record => record.pruid == 31)[0]._id)
          res.body.filter(record => record.pruid == 31)[0].should.have.property('pruid').eq('31')
          done()
        })
    })
  })

  /**Delete */
  describe('DELETE /api/records:id', () => {
    it('It should delete a record by ID', (done) => {

      let mockRecordId

      Record.findOne().sort({'_id':-1}).limit(1)
        .then(anan => mockRecordId = anan._id).catch(err => console.log(err))
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
