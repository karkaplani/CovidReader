const chai = require('chai')
const chaiHttp = require('chai-http')
const { response } = require('../CovidReader')
const server = require('../CovidReader') 

chai.should()
chai.use(chaiHttp)

describe('Records API', () => {

  /**Get */
  describe('GET /api/records', () => {
    it('It should get all the records', (done) => {
      chai.request(server)
        .get('/api/records')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eq(11)
        done()
        })
    })
  })

  /**Get with ID */
  describe('GET /api/records:id', () => {
    it('It should get a record by ID', (done) => {
      const recordID = 0
      chai.request(server) 
        .get('/api/records/'+recordID)
        .end((err, res) => {
          res.should.have.status(200)
          res.body[0].should.be.a('object')
          res.body[0].should.have.property('id').eq(recordID)
          done()
        })
    })
  })

  /**Post */
  describe('POST /api/records', () => {
    it('It should add a new record', (done) => {
      const newRecord = {
        "id": 31,
        "pruid": 31,
        "prname": 31,
        "prnameFR": 31,
        "date": 31,
        "numconf": 31,
        "numprob": 31,
        "numdeaths": 31,
        "numtotal": 31,
        "numtoday": 31
      }
      chai.request(server)
        .post('/api/records/')
        .send(newRecord)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.filter(record => record.id == 31)[0].should.have.property('id').eq(31)
          done()
        })
    })
  })

  /**Delete */
  describe('DELETE /api/records:id', () => {
    it('It should delete a record by ID', (done) => {
      const recordID = 0
      chai.request(server)
        .delete('/api/records/' + recordID)
        .end((err, res) => {
          res.should.have.status(200)
          res.body[recordID].should.have.property('id').not.eq(0)
          done()
        })
    })
  })

  /**Put */
  describe('PUT /api/records:id', () => {
    it('It should update a record', (done) => {
      const recordID = 0
      const recordUpdated = { "pruid": 31 }
      chai.request(server)
        .put('/api/records/' + recordID)
        .send(recordUpdated)
        .end((err, res) => {
          res.should.have.status(200)
          res.body[recordID].should.have.property('pruid').eq(31)
          done()
        }).catch(done())
    })
  })
})
