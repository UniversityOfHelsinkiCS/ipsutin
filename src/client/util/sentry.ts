import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'
import { inProduction, inStaging, GIT_SHA } from '../../config'

const initializeSentry = () => {
  if (inProduction || inStaging) {
    Sentry.init({
      dsn: 'https://506394e42eb84c208fc1dfad42a63425@sentry.cs.helsinki.fi/17',
      release: GIT_SHA,
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1.0,
    })
  }
}

export default initializeSentry
