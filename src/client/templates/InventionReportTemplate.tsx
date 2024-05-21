import { useTranslation } from 'react-i18next'

import { useLoggedInUser } from '../hooks/useUser'

const InventionReportEmailTemplate = () => {
  const { t } = useTranslation()
  const { user, isLoading } = useLoggedInUser()

  if (isLoading || !user) return null

  return (
    <div style={{ borderBottom: '1px solid' }}>
      <h3>
        <strong>{t(`Inventor's Assistant: Invention Report`)}</strong>
      </h3>

      <br />

      <p>
        {user.firstName} {user.lastName} would like to share their Invention
        Report with you.
      </p>

      <br />

      <p>Invention Report</p>

      <br />
    </div>
  )
}

export default InventionReportEmailTemplate
