'use strict'

const Joi = require('joi')
const EnvSchema = require('./env.schema')

const EnvVars = Joi.attempt(process.env, EnvSchema)

module.exports = {
  isProduction: EnvVars.NODE_ENV === 'production',
  isTest: EnvVars.NODE_ENV === 'test',

  application: {
    port: EnvVars.PORT,
    instances: EnvVars.SERVER_CLUSTER_INSTANCES,
    maxMemoryRestart: EnvVars.SERVER_MAX_MEMORY_BEFORE_RESTART
  },

  github: {
    token: EnvVars.GITHUB_AUTH_TOKEN
  },

  hooks: {
    config: EnvVars.HOOKS_CONFIG
  }
}
