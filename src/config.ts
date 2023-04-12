export const inDevelopment = import.meta.env.NODE_ENV === 'development'

export const inStaging = import.meta.env.REACT_APP_STAGING === 'true'

export const inProduction =
  !inStaging && import.meta.env.NODE_ENV === 'production'

export const inE2EMode = import.meta.env.REACT_APP_E2E === 'true'

export const GIT_SHA = import.meta.env.REACT_APP_GIT_SHA || ''

export const PUBLIC_URL = import.meta.env.PUBLIC_URL || ''

export const DEFAULT_SURVEY_NAME =
  import.meta.env.DEFAULT_SURVEY_NAME || 'testSurvey'

export const FORM_DATA_KEY = 'ipsutin_local_save'
