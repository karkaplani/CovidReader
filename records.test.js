const express = require('express')
const routes = require('./routes/api/records')
const request = require('supertest')

const app = express()
app.use('/api/records', routes) 

describe('testing server routes', () => {
    it('GET /api/records/0 - success', async() => {
        const body = await request(app).get('/api/records/0')
        expect(body).toEqual([
            {
                "id": 0,
                "pruid": "35",
                "prname": "Ontario",
                "prnameFR": "Ontario",
                "date": "2020-01-31",
                "numconf": "3",
                "numprob": "0",
                "numdeaths": "0",
                "numtotal": "3",
                "numtoday": "3"
            }
        ])
    })
})

app.listen(5000, () => console.log('Server started'))