'use strict'

require('dotenv').config()

const Pino = require('pino')
const Logger = require('./src/utils/logger')
const Server = require('./src/server')

const uncaughtException =
  Pino.final(Logger,
    (err, finalLogger) => {
      finalLogger.error(err, 'uncaughtException')
      process.exit(1)
    })

process.once('SIGTERM', () => Logger.info('APPLICATION TERMINATED'))
process.once('SIGINT', () => Logger.info('APPLICATION TERMINATED'))
process.once('uncaughtException', uncaughtException)
process.on('unhandledRejection', reason => Logger.warn(reason, 'promise'))

Server.prepare()
Server.start()
