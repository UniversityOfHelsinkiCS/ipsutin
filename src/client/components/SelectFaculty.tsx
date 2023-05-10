import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import styles from '../styles'
import { InputProps, Faculty, Locales } from '../types'
import useFaculties from '../hooks/useFaculty'
import Markdown from './Common/Markdown'
import extraOrganisations from '../util/organisations'

const sortFaculties = (faculties: Faculty[], language: keyof Locales) => {
  const sortedFaculties = faculties.sort((a, b) => {
    if (a.name[language] > b.name[language]) return 1
    if (a.name[language] < b.name[language]) return -1

    return 0
  })

  return sortedFaculties
}

const SelectFaculty = ({ setFaculty, faculty }: InputProps) => {
  const { t, i18n } = useTranslation()
  const { language } = i18n
  const { faculties, isLoading: facultiesLoading } = useFaculties()

  const { cardStyles, formStyles } = styles

  if (facultiesLoading) return null

  const sortedFaculties = sortFaculties(faculties, language as keyof Locales)
  const organisations = sortedFaculties.concat(extraOrganisations)

  const handleFacultyChange = (event: SelectChangeEvent) => {
    setFaculty(event.target.value)
  }

  return (
    <Box sx={cardStyles.card}>
      <Typography variant="h5" sx={cardStyles.heading} component="div">
        {t('facultySelect:welcomeMessage')}
      </Typography>
      <Box sx={cardStyles.content}>
        <Markdown>{t('facultySelect:introMessage')}</Markdown>
      </Box>
      <FormControl sx={formStyles.formControl}>
        <InputLabel>{t('facultySelect:inputLabel')}</InputLabel>
        <Select
          sx={cardStyles.inputField}
          data-cy="faculty-select"
          value={faculty}
          label={t('facultySelect:inputLabel')}
          onChange={handleFacultyChange}
        >
          {organisations.map((f: Faculty) => (
            <MenuItem
              data-cy={`faculty-option-${f.code}`}
              key={f.code}
              value={f.code}
            >
              {f.name[language as keyof Locales]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default SelectFaculty
