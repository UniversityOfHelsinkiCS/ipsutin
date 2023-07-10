import React, { useEffect, useState } from 'react'
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
} from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'

import Markdown from '../Common/Markdown'

import styles from '../../styles'

const SelectSurvey = () => {
  const { t } = useTranslation()
  const [survey, setSurvey] = useState<string>('')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const { cardStyles, formStyles } = styles

  const faculty = searchParams.get('faculty')

  useEffect(() => {
    const params = { faculty }
    navigate({
      pathname: `/${survey}`,
      search: `?${createSearchParams(params)}`,
    })
  }, [faculty, navigate, searchParams, survey])

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
          value={survey || ''}
          label={t('surveySelect:inputLabel')}
          onChange={(e: SelectChangeEvent) => setSurvey(e.target.value)}
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
