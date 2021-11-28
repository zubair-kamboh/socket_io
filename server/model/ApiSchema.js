const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MemberSchema = new Schema({
  name: String,
  email: String,
  date: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
})

const ApiModel = mongoose.model('Members', MemberSchema)

module.exports = ApiModel
