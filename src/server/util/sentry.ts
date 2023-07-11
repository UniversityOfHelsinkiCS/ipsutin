import { init as initSentry, Integrations } from '@sentry/node'
import { Integrations as TracingIntegrations } from '@sentry/tracing'
import { Express } from 'express-serve-static-core'

import { inProduction, inStaging, inE2EMode, GIT_SHA } from '../../config'

const initializeSentry = (router: Express) => {
  if (!inProduction || inStaging || inE2EMode) return

  initSentry({
    dsn: 'https://df9acc7c370a4a7396e99888a8f3eadb@sentry.cs.helsinki.fi/15',
    release: GIT_SHA,
    integrations: [
      new Integrations.Http({ tracing: true }),
      new TracingIntegrations.Express({ router }),
    ],
    tracesSampleRate: 1.0,
  })
}

export default initializeSentry
