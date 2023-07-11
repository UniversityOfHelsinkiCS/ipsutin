import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import useFaculties from '../../hooks/useFaculty'
import useUserFaculties from '../../hooks/useUserFaculties'

import Markdown from '../Common/Markdown'

import extraOrganisations from '../../util/organisations'

import { Faculty, Locales } from '../../types'
import styles from '../../styles'

const sortFaculties = (faculties: Faculty[], language: keyof Locales) => {
  const sortedFaculties = faculties.sort((a, b) => {
    if (a.name[language] > b.name[language]) return 1
    if (a.name[language] < b.name[language]) return -1

    return 0
  })

  return sortedFaculties
}

const SelectFaculty = () => {
  const { t, i18n } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [faculty, setFaculty] = useState<Faculty>()
  const { faculties, isLoading: facultiesLoading } = useFaculties()
  const { userFaculties, isLoading: userFacultiesLoading } = useUserFaculties()

  const { language } = i18n
  const { cardStyles, formStyles } = styles

  useEffect(() => {
    if (userFacultiesLoading || !userFaculties) return

    const userFaculty = userFaculties[0]

    setSearchParams({ faculty: userFaculty.code })
    setFaculty(userFaculty)
  }, [setSearchParams, userFaculties, userFacultiesLoading])

  useEffect(() => {
    if (facultiesLoading) return

    const facultyCode = searchParams.get('faculty')
    const selectedFaculty = faculties.find((f) => f.code === facultyCode)

    if (selectedFaculty) setFaculty(selectedFaculty)
  }, [faculties, facultiesLoading, searchParams])

  if (facultiesLoading) return null

  const sortedFaculties = sortFaculties(faculties, language as keyof Locales)
  const organisations = sortedFaculties.concat(extraOrganisations)

  return (
    <Box sx={cardStyles.card}>
      <Box sx={cardStyles.content}>
        <Markdown>{t('facultySelect:introMessage')}</Markdown>
      </Box>
      <FormControl sx={formStyles.formControl}>
        <InputLabel>{t('facultySelect:inputLabel')}</InputLabel>
        <Select
          sx={cardStyles.inputField}
          data-cy='faculty-select'
          label={t('facultySelect:inputLabel')}
          value={faculty?.code || ''}
        >
          {organisations.map((f: Faculty) => (
            <MenuItem
              data-cy={`faculty-option-${f.code}`}
              key={f.code}
              value={f.code}
              onClick={() => {
                setSearchParams({ faculty: f.code })
                setFaculty(f)
              }}
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
