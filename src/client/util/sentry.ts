import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'

import { GIT_SHA, inProduction, inStaging } from '../../config'

const initializeSentry = () => {
  if (inProduction || inStaging) {
    Sentry.init({
      dsn: 'https://f1febb592f09a6756ddfcff7257f45e3@toska.cs.helsinki.fi/10',
      release: GIT_SHA,
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1.0,
    })
  }
}

export default initializeSentry
