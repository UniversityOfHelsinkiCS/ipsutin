import { init as initSentry, Integrations } from '@sentry/node'
import { Integrations as TracingIntegrations } from '@sentry/tracing'
import { Express } from 'express-serve-static-core'

import { GIT_SHA, inProduction, inStaging } from '../../config'

const initializeSentry = (router: Express) => {
  if (inProduction || inStaging) {
    initSentry({
      dsn: 'https://506394e42eb84c208fc1dfad42a63425@sentry.cs.helsinki.fi/17',
      release: GIT_SHA,
      integrations: [
        new Integrations.Http({ tracing: true }),
        new TracingIntegrations.Express({ router }),
      ],
      tracesSampleRate: 1.0,
    })
  }
}

export default initializeSentry
