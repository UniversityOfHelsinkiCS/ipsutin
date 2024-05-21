import { useTranslation } from 'react-i18next'
import { SurveyName } from '@backend/types'

import { useLoggedInUser } from '../hooks/useUser'

interface ShareResultsEmailProps {
  surveyName: SurveyName
}

const ShareResultsEmailTemplate = ({ surveyName }: ShareResultsEmailProps) => {
  const { t } = useTranslation()

  const { user, isLoading } = useLoggedInUser()

  if (isLoading || !user) return null
  return (
    <div style={{ borderBottom: '1px solid' }}>
      <h3>
        <strong>{t(`surveyNames:${surveyName}`)}</strong>
      </h3>

      <br />

      <p>
        {user.firstName} {user.lastName} would like to share their results with
        you.
      </p>

      <br />

      <p>Summary of the survey selections below</p>

      <br />
    </div>
  )
}

export default ShareResultsEmailTemplate
