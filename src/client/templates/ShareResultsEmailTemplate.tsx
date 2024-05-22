import { useTranslation } from 'react-i18next'
import { SurveyName, User } from '@backend/types'

interface ShareResultsEmailProps {
  surveyName: SurveyName
  user: User
}

const ShareResultsEmailTemplate = ({
  surveyName,
  user,
}: ShareResultsEmailProps) => {
  const { t } = useTranslation()

  if (!user) return null
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
