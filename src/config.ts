export const inStaging = process.env.REACT_APP_STAGING === 'true'

export const inProduction = !inStaging && process.env.NODE_ENV === 'production'

export const inE2EMode = process.env.REACT_APP_E2E === 'true'

export const GIT_SHA = process.env.REACT_APP_GIT_SHA || ''

export const JAMI_URL = inProduction
  ? 'https://importer.cs.helsinki.fi/api/auth'
  : 'https://toska-staging.cs.helsinki.fi/jami'
