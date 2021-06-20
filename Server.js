/**
 * @author Abdullah Ilgun (Apo)
 * The main module to be called by Node. It's doing nothing but starting
 * the server. It creates the URl and uses the records file to set the routes.
 */

const express = require('express')
const app = express()
const routes = require('./routes/api/records')

//Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/records', routes)

//Default port is 5000, and if the server doesn't start on 5000, logs which port it started
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
console.log('\nBy Abdullah Zeki Ilgun')

module.exports = app