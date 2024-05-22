import { useTranslation } from 'react-i18next'
import { User } from '@backend/types'

const InventionReportEmailTemplate = ({ user }: { user: User | undefined }) => {
  const { t } = useTranslation()

  if (!user) return null

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
