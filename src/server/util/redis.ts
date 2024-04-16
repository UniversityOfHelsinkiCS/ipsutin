/* eslint-disable import/no-extraneous-dependencies */
import RedisStore from 'connect-redis'
import Redis from 'ioredis'

import { REDIS_HOST } from './config'

export const redis = new Redis({
  host: REDIS_HOST,
  port: 6379,
})

export const redisStore = new RedisStore({
  client: redis,
})
