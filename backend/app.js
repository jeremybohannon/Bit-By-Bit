const express = require('express')
const https = require('https')
const fs = require('fs')
const cors = require('cors')
const bodyParser = require('body-parser')
const MongooseService = require('./services/Mongoose/Mongoose.service')
const config = require('./config.json')

const user = require('./routes/user.route')

const app = express()

const port = config.port

const mongooseService = new MongooseService(config.mongoDB.db_url.dev)
mongooseService.connect()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/user', user)

try {
  https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: ''
  }, app)
  console.log(`${config.appName} backend is running on: ${port}`)
} catch (err) {
  console.log('error starting app: ' + err)
}