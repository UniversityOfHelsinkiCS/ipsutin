import * as dotenv from 'dotenv'

import { inProduction } from '../../config'

dotenv.config()

export const PORT = process.env.PORT || 8000

export const { API_TOKEN } = process.env

export const DB_CONFIG = {
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 10000,
    idle: 300000000,
  },
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  logging: false,
}

export const JAMI_URL = inProduction
  ? 'https://importer.cs.helsinki.fi/api/auth'
  : 'https://toska-staging.cs.helsinki.fi/jami'
