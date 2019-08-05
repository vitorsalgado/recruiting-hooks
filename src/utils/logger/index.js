'use strict'

const Pino = require('pino')
const Config = require('../../config')

module.exports = Pino(
  {
    crlf: true,
    safe: true,
    timestamp: true,
    prettyPrint: !Config.isProduction
  })
