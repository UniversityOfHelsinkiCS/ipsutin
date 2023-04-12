import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Box, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import styles from '../../styles'
import { InputProps, Faculty, Locales } from '../../types'
import useFaculties from '../../hooks/useFaculties'
import useUserFaculties from '../../hooks/useUserFaculties'
import Markdown from '../Common/Markdown'

const extraOrganisations: Faculty[] = [
  {
    code: 'H906',
    name: {
      fi: 'Kielikeskus',
      sv: 'Språkcentrum',
      en: 'Language Centre',
    },
  },
  {
    code: 'OTHER',
    name: {
      fi: 'Muu',
      sv: 'Other',
      en: 'Other',
    },
  },
]

const sortFaculties = (faculties: Faculty[], language: keyof Locales) => {
  const sortedFaculties = faculties.sort((a, b) => {
    if (a.name[language] > b.name[language]) return 1
    if (a.name[language] < b.name[language]) return -1

    return 0
  })

  return sortedFaculties
}

const SelectFaculty = ({ control }: InputProps) => {
  const { t, i18n } = useTranslation()
  const { language } = i18n
  const [faculty, setFaculty] = useState('')
  const { faculties, isLoading: facultiesLoading } = useFaculties()
  const { userFaculties, isLoading: userFacultiesLoading } = useUserFaculties()

  const handleChange = (event: SelectChangeEvent) => {
    setFaculty(event.target.value)
  }

  const { cardStyles, formStyles } = styles

  if (facultiesLoading || userFacultiesLoading) return null

  const sortedFaculties = sortFaculties(faculties, language as keyof Locales)
  const organisations = sortedFaculties.concat(extraOrganisations)

  return (
    <Box sx={cardStyles.card}>
      <Typography variant="h5" sx={cardStyles.heading} component="div">
        {t('facultySelect:welcomeMessage')}
      </Typography>
      <Box sx={cardStyles.content}>
        <Markdown>{t('facultySelect:introMessage')}</Markdown>
      </Box>

      <Controller
        control={control}
        name="faculty"
        defaultValue={userFaculties[0]?.code || ''}
        render={({ field }) => (
          <FormControl sx={formStyles.formControl}>
            <InputLabel>{t('facultySelect:inputLabel')}</InputLabel>
            <Select
              data-cy="faculty-select"
              value={faculty}
              label={t('facultySelect:inputLabel')}
              onChange={handleChange}
              {...field}
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
        )}
      />
    </Box>
  )
}

export default SelectFaculty
