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
    HOST: Joi.string().default('0.0.0.0'),
    SERVER_CLUSTER_INSTANCES: Joi.number().default(0),
    SERVER_MAX_MEMORY_BEFORE_RESTART: Joi.string().default('1G'),

    GITHUB_AUTH_TOKEN: Joi.string(),
    HOOKS_CONFIG: Joi.string().default('{}')
  })
  .unknown(true)
  .options({ abortEarly: false })
  .label('Env Vars')
