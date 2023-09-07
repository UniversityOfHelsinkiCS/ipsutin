import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'

import styles from '../../styles'
import Markdown from '../Common/Markdown'

const SelectSurvey = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [survey, setSurvey] = useState<string>('')

  const { cardStyles, formStyles } = styles

  const faculty = searchParams.get('faculty')

  const routeParts = location.pathname.split('/').filter(Boolean)

  useEffect(() => {
    if (!faculty || faculty === 'null') return

    const params = { faculty }

    navigate({
      pathname: location.pathname,
      search: `?${createSearchParams(params)}`,
    })
  }, [faculty, location.pathname, navigate, searchParams, survey])

  const handleSurveyChange = (event: SelectChangeEvent) => {
    setSurvey(event.target.value)
    navigate({
      pathname: `/${event.target.value}`,
      search: location.search,
    })
  }

  if (faculty === 'null') return null

  return (
    <Box sx={cardStyles.card}>
      <Box sx={cardStyles.content}>
        <Markdown>{t('surveySelect:introMessage')}</Markdown>
      </Box>
      <FormControl sx={formStyles.formControl}>
        <InputLabel>{t('surveySelect:inputLabel')}</InputLabel>
        <Select
          sx={cardStyles.inputField}
          data-cy='survey-select'
          value={routeParts[0] || ''}
          label={t('surveySelect:inputLabel')}
          onChange={handleSurveyChange}
        >
          <MenuItem value='ipassessment'>
            {t('surveyNames:ipAssessment')}
          </MenuItem>
          <MenuItem value='licences'>{t('surveyNames:licences')}</MenuItem>
          <MenuItem value='ideaevaluation'>
            {t('surveyNames:ideaEvaluation')}
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default SelectSurvey
