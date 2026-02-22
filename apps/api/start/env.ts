/*
|--------------------------------------------------------------------------
| Environment variables service
|--------------------------------------------------------------------------
|
| The `Env.create` method creates an instance of the Env service. The
| service validates the environment variables and also cast values
| to JavaScript data types.
|
*/

import { Env } from '@adonisjs/core/env'

export default await Env.create(new URL('../', import.meta.url), {
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  HOST: Env.schema.string({ format: 'host' }),
  LOG_LEVEL: Env.schema.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']),

  /*
  |----------------------------------------------------------
  | Variables for configuring database connection
  |----------------------------------------------------------
  */
  DB_HOST: Env.schema.string({ format: 'host' }),
  DB_PORT: Env.schema.number(),
  DB_USER: Env.schema.string(),
  DB_PASSWORD: Env.schema.string.optional(),
  DB_DATABASE: Env.schema.string(),

  /*
  |----------------------------------------------------------
  | Variables for configuring JWT authentication
  |----------------------------------------------------------
  */
  JWT_SECRET: Env.schema.string(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: Env.schema.enum(['5m', '10m', '15m', '30m', '1h', '2h'] as const),
  JWT_REFRESH_TOKEN_SECRET: Env.schema.string(),
  JWT_REFRESH_TOKEN_EXPIRES_IN: Env.schema.enum(['1d', '7d', '14d', '30d', '90d'] as const),
  MAX_ACTIVE_TOKENS_PER_USER: Env.schema.number(),
})
