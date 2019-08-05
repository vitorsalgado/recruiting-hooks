'use strict'

const Express = require('express')
const BodyParser = require('body-parser')
const PinoExpress = require('express-pino-logger')()

const Config = require('./config')
const Logger = require('./utils/logger')
const Slack = require('./utils/slack')
const GitHubUtils = require('./utils/github')
const HooksConfig = JSON.parse(Config.hooks.config)

if (!HooksConfig.hooks || HooksConfig.hooks.length === 0) {
  Logger.error('No Github WebHook configurations found! Exiting application ...')
  process.exit(1)
}

const WebHookServer = Express()

WebHookServer.use(BodyParser.json())
WebHookServer.use(PinoExpress)

WebHookServer.get('/health', (req, res) => res.json({ live: true }).status(200))

HooksConfig.hooks
  .forEach(hook =>
    WebHookServer
      .post(hook.path, (req, res) => {
        const pr = req.body

        if (!['opened', 'reopened'].includes(pr.action.toLowerCase())) {
          return res.sendStatus(204)
        }

        return Promise
          .all(
            [
              GitHubUtils.addLabel(pr),
              Slack.sendMessage(hook, pr)
            ]
          )
          .then(() => res.sendStatus(204))
      }))

module.exports.start = () =>
  WebHookServer
    .listen(Config.application.port,
      () =>
        Logger.info(`WebHook Server is online on: ${Config.application.port}`))

module.exports.listener = () => WebHookServer
