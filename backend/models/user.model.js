const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userId: {type: String, required: true, max: 1000},
    userData: {type: Object, require: true}
})

module.exports = mongoose.model('User', UserSchema)
