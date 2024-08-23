export const inDevelopment = process.env.NODE_ENV === 'development'

export const inStaging = process.env.REACT_APP_STAGING === 'true'

export const inProduction = !inStaging && process.env.NODE_ENV === 'production'

export const inE2EMode = process.env.REACT_APP_E2E === 'true'

export const GIT_SHA = process.env.REACT_APP_GIT_SHA || ''

export const PUBLIC_URL = process.env.PUBLIC_URL || ''

export const DEFAULT_SURVEY_NAME =
  process.env.DEFAULT_SURVEY_NAME || 'testSurvey'

export const LICENCES_DATA_KEY = 'ipsutin_licenses_local_save'

export const IDEA_EVALUATION_DATA_KEY = 'ipsutin_idea_evaluation_local_save'

export const IP_ASSESSMENT_DATA_KEY = 'ipsutin_ip_assessment_local_save'

export const INNOVATION_SERVICES_EMAIL =
  process.env.INNOVATION_SERVICES_EMAIL || 'his@helsinki.fi'

export const validModels = [
  {
    name: 'gpt-4o',
    deployment: process.env.GPT_4O || 'gpt-4o',
    context: 128_000,
  },
].concat(
  // Add mock model if not in production
  inProduction
    ? []
    : [
        {
          name: 'mock',
          deployment: 'mock',
          context: 128_000,
        },
      ]
)

// eslint-disable-next-line no-nested-ternary
export const FULL_URL = inProduction
  ? 'https://innotin.helsinki.fi'
  : inStaging
    ? 'https://ipsutin.ext.ocp-test-0.k8s.it.helsinki.fi'
    : 'http://localhost:3000'
