import { useTranslation } from 'react-i18next'
import { SurveyName, User } from '@backend/types'

interface ShareResultsEmailProps {
  user: User
  surveyName: SurveyName
}

const ShareResultsEmailTemplate = ({
  user,
  surveyName,
}: ShareResultsEmailProps) => {
  const { t } = useTranslation()

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
