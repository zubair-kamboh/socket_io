const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserGoogleSchema = new Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const UserModel = mongoose.model('GoogleUsers', UserGoogleSchema)
module.exports = UserModel
