import { useTranslation } from 'react-i18next'
import { User } from '@backend/types'

interface ContactTicketTemplateProps {
  user: User
  content: string
}

const ContactTicketTemplate = ({
  user,
  content,
}: ContactTicketTemplateProps) => {
  const { t } = useTranslation()

  return (
    <div>
      <h3>
        <strong>Ipsutin Contact Ticket</strong>
      </h3>

      <br />

      <p>
        <strong>{t('contact:contactTicketSenderEmail')} </strong>
        {user?.email}
      </p>
      <p>
        <strong>{t('contact:contactTicketSenderFullname')} </strong>
        {user?.firstName} {user?.lastName}
      </p>

      <br />

      <p>**********</p>
      <p>
        <strong>{t('contact:contactTicketUserMessage')}</strong>
      </p>
      <p>{content}</p>
      <p>**********</p>
    </div>
  )
}

export default ContactTicketTemplate
