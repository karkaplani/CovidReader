/**
 * @author Abdullah Ilgun (Apo)
 * This class reads the data from the file using a parsing library, stores the records in 
 * data transfer objects, and the objects in an array, then displays the first 10 records 
 * on the browser using Express framework.
 */

const express = require('express'); 
const app = express();
const routes = require('./routes/api/records')

//Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/records', routes)

//Default port is 5000, and if the server doesn't start on 5000, logs which port it started
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
console.log('\nBy Abdullah Zeki Ilgun')

module.exports = app