'use strict'

const Joi = require('joi')

const Package = require('../../package.json')
const EnvSchema = require('./env.schema')

const EnvVars = Joi.attempt(process.env, EnvSchema)

module.exports = {
  env: EnvVars.NODE_ENV,
  version: Package.version,

  isProduction: EnvVars.NODE_ENV === 'production',
  isTest: EnvVars.NODE_ENV === 'test',

  application: {
    port: EnvVars.PORT,
    instances: EnvVars.SERVER_CLUSTER_INSTANCES,
    maxMemoryRestart: EnvVars.SERVER_MAX_MEMORY_BEFORE_RESTART
  },

  github: {
    token: EnvSchema.GITHUB_AUTH_TOKEN
  },

  slack: {
    hook: EnvSchema.SLACK_WEBHOOK
  },

  hooks: {
    java: {
      repo: EnvSchema.JAVA_REPO,
      labels: EnvSchema.JAVA_LABELS
    }
  }
}
