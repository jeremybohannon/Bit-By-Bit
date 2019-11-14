const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ByteSchema = new Schema({
    date: {type: String, required: true, max: 100},
    mood: {type: Number, required: true},
})

module.exports = mongoose.model('Byte', ByteSchema)