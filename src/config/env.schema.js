'use strict'

/**
 * Environment variables schema and data transformation.
 * This should be used instead of direct calling process.env.
 * @module EnvVars
 */

const Joi = require('joi')

/**
 * Environment variables schema
 * @enum
 * @readonly
 */
module.exports = Joi.object(
  {
    NODE_ENV: Joi.string().allow('development', 'test', 'production').default('production'),

    PORT: Joi.number().default(3000),
    SERVER_CLUSTER_INSTANCES: Joi.number().default(0),
    SERVER_MAX_MEMORY_BEFORE_RESTART: Joi.string().default('1G'),

    GITHUB_AUTH_TOKEN: Joi.string(),
    SLACK_WEBHOOK: Joi.string(),

    JAVA_REPO: Joi.string(),
    JAVA_LABELS: Joi.array().items(Joi.string()).single()
  })
  .unknown(true)
  .options({ abortEarly: false })
  .label('Env Vars')
