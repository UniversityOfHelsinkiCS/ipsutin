/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const Service = () => {
  const { t } = useTranslation()

  const { serviceId } = useParams()

  return (
    <div>
      <h1>{serviceId}</h1>
    </div>
  )
}

export default Service
