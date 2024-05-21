import * as dotenv from 'dotenv'

import { inProduction, inStaging } from '../../config'

dotenv.config()

export const PORT = process.env.PORT || 8000

export const { API_TOKEN, OPENAI_API_KEY, CURRE_API_PASSWORD } = process.env

let connectionString = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DATABASE}?targetServerType=primary`

if (inProduction || inStaging) connectionString = `${connectionString}&ssl=true`

export const AZURE_API_KEY = process.env.AZURE_API_KEY || ''

export const AZURE_RESOURCE = process.env.AZURE_RESOURCE || ''

export const DB_CONNECTION_STRING = connectionString

export const REDIS_HOST = process.env.REDIS_HOST || 'redis'

export const SESSION_SECRET = process.env.SESSION_SECRET || ''

export const JAMI_URL = inProduction
  ? 'https://api-toska.apps.ocp-prod-0.k8s.it.helsinki.fi/jami/'
  : 'https://api-toska.apps.ocp-test-0.k8s.it.helsinki.fi/jami'

export const PATE_URL = inProduction
  ? 'https://api-toska.apps.ocp-prod-0.k8s.it.helsinki.fi/pate/'
  : 'https://api-toska.apps.ocp-test-0.k8s.it.helsinki.fi/pate/'

export const IMPORTER_URL = inProduction
  ? 'https://api-toska.apps.ocp-prod-0.k8s.it.helsinki.fi/importer/kliksutin'
  : 'https://api-toska.apps.ocp-test-0.k8s.it.helsinki.fi/importer/kliksutin'

export const OIDC_ISSUER = inProduction
  ? 'https://login.helsinki.fi/.well-known/openid-configuration'
  : 'https://login-test.it.helsinki.fi/.well-known/openid-configuration'

export const OIDC_CLIENT_ID = process.env.OIDC_CLIENT_ID || ''

export const OIDC_CLIENT_SECRET = process.env.OIDC_CLIENT_SECRET || ''

export const OIDC_REDIRECT_URI = process.env.OIDC_REDIRECT_URI || ''
