'use strict'

const Pino = require('pino')

module.exports = Pino(
  {
    crlf: true,
    safe: true,
    timestamp: true
  })
