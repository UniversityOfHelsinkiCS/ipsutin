import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import styles from '../../styles'
import { InputProps } from '../../types'
import Markdown from '../Common/Markdown'

const SelectSurvey = ({ surveyName, setSurvey }: InputProps) => {
  const { t } = useTranslation()

  const { cardStyles, formStyles } = styles

  const handleSurveyChange = (event: SelectChangeEvent) => {
    setSurvey(event.target.value)
  }

  return (
    <Box sx={cardStyles.card}>
      <Box sx={cardStyles.content}>
        <Markdown>{t('surveySelect:introMessage')}</Markdown>
      </Box>
      <FormControl sx={formStyles.formControl}>
        <InputLabel>{t('surveySelect:inputLabel')}</InputLabel>
        <Select
          sx={cardStyles.inputField}
          data-cy="survey-select"
          value={surveyName}
          label={t('surveySelect:inputLabel')}
          onChange={handleSurveyChange}
        >
          <MenuItem value="ipassessment">
            {t('surveyNames:ipAssessment')}
          </MenuItem>
          <MenuItem value="licences">{t('surveyNames:licences')}</MenuItem>
          <MenuItem value="ideaevaluation">
            {t('surveyNames:ideaEvaluation')}
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default SelectSurvey
