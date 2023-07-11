import React, { useEffect, useState } from 'react'
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
  useLocation,
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
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [survey, setSurvey] = useState<string>('')

  const { cardStyles, formStyles } = styles

  const faculty = searchParams.get('faculty')
  const path = survey || location.pathname.substring(1)

  useEffect(() => {
    const params = { faculty }

    navigate({
      pathname: path,
      search: `?${createSearchParams(params)}`,
    })
  }, [faculty, location.pathname, navigate, path, searchParams, survey])

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
          value={path}
          label={t('surveySelect:inputLabel')}
          onChange={(e: SelectChangeEvent) => {
            setSurvey(e.target.value)
          }}
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
