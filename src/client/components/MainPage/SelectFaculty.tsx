import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { Faculty, Locales } from '@backend/types'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import { useFaculties, useUserFaculties } from '../../hooks/useFaculty'
import styles from '../../styles'
import extraOrganisations from '../../util/organisations'
import Markdown from '../Common/Markdown'

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
    if (!faculties || facultiesLoading) return
    if (userFacultiesLoading || !userFaculties || userFaculties?.length === 0) {
      const otherFaculty = extraOrganisations.find((f) => f.code === 'OTHER')
      setFaculty(otherFaculty)

      return
    }

    const facultyCode = searchParams.get('faculty')
    const selectedFaculty = faculties.find((f) => f.code === facultyCode)

    if (selectedFaculty) {
      setFaculty(selectedFaculty)
    } else if (userFaculties.length > 0) {
      const userFaculty = userFaculties[0]

      setSearchParams({ faculty: userFaculty?.code })
      setFaculty(userFaculty)
    }
  }, [
    faculties,
    facultiesLoading,
    searchParams,
    setSearchParams,
    userFaculties,
    userFacultiesLoading,
  ])

  if (!faculties || facultiesLoading) return null

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
