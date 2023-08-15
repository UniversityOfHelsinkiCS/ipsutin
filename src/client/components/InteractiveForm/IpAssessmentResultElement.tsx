import { IPAssessmentResult, Locales } from '@backend/types'
import { Box, Container } from '@mui/material'

import Markdown from '../Common/Markdown'

const IpAssessmentResultElement = ({
  language,
  resultData,
}: {
  language: keyof Locales
  resultData: IPAssessmentResult
}) => {
  if (!resultData) return null

  return (
    <Container
      style={{
        margin: '2rem 0 2rem 0',
        borderLeft: 'solid',
        borderColor: '#9ca3af',
        borderWidth: '1px',
      }}
    >
      <Box style={{ margin: '2rem 0 2rem 1rem' }}>
        <Markdown>{resultData.isSelected[language]}</Markdown>
      </Box>
    </Container>
  )
}

export default IpAssessmentResultElement
