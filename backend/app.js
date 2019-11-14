const express = require('express')
const bodyParser = require('body-parser')
const MongooseService = require('./services/Mongoose/Mongoose.service')
const config = require('./config.json')

const byte = require('./routes/byte.route')

const app = express()

const port = config.port

const mongooseService = new MongooseService(config.mongoDB.db_url.dev)
mongooseService.connect()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/byte', byte);

app.listen(port, () => {
    console.log(`${config.appName} backend is running on: ${port}`)
})