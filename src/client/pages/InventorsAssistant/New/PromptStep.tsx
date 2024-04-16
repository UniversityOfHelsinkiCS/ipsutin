import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

const PromptStep = () => {
  const { t } = useTranslation()
  const { step } = useParams()

  console.log(t, step)

  return <Box component='article'>asdfasdf</Box>
}

export default PromptStep
