const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = new Schema({
  image: String,
})

const ApiModel = mongoose.model('Members', MemberSchema)

module.exports = ImageSchema
