/**
 * @author Abdullah Ilgun (Apo)
 * The main module to be called by Node. It's doing nothing but starting
 * the server. It creates the URl and uses the records file to set the routes.
 */

const express = require('express')
const app = express()
const routes = require('./routes/api/records')
const mongoose = require('mongoose')

//Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/records', routes)

const db = require('./config/keys').mongoURI
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))

//Default port is 5000, and if the server doesn't start on 5000, logs which port it started
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
console.log('\nBy Abdullah Zeki Ilgun')

//  db.collection('cases')

module.exports = app