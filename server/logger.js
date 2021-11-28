const EventEmitter = require('events')
const uuid = require('uuid')

// create class
class Logger extends EventEmitter {
  log(msg) {
    // emit event
    this.emit('message', { id: uuid.v4(), msg: msg })
  }
}

module.exports = Logger
