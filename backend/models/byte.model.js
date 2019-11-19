const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ByteSchema = new Schema({
    date: {type: String, required: true, max: 100},
    mood: {type: Number, required: true},
    emotions: {type: String, required: false, max: 500},
    notes: {type: String, required: false, max: 500}
})

const testSchema = new Schema({
    userId: {type: String, required: true, max: 200},
    byte: {type: Array, require: true}
})

module.exports = mongoose.model('Byte', ByteSchema)
