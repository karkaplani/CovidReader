const userName = 'karkaplani88'
const password = 'karkaplani88'
const dbName = 'covid_cases'

module.exports = {
    mongoURI: `mongodb+srv://${userName}:${password}@cluster0.mkgug.mongodb.net/${dbName}?retryWrites=true&w=majority`
}