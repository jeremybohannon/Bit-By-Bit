const express = require('express')
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

app.listen(port, () => {
  console.log(`${config.appName} backend is running on: ${port}`)
})