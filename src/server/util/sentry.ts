import { init as initSentry, Integrations } from '@sentry/node'
import { Integrations as TracingIntegrations } from '@sentry/tracing'
import { Express } from 'express-serve-static-core'

import { GIT_SHA, inProduction, inStaging } from '../../config'

const initializeSentry = (router: Express) => {
  if (inProduction || inStaging) {
    initSentry({
      dsn: 'https://f1febb592f09a6756ddfcff7257f45e3@toska.cs.helsinki.fi/10',
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
