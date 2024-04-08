import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { Faculty, Locales } from '@backend/types'
import {
  FormControl,
  InputLabel,
  ListItem,
  ListSubheader,
  MenuItem,
  Select,
} from '@mui/material'
import { enqueueSnackbar } from 'notistack'

import { useFaculties, useUserFaculties } from '../../hooks/useFaculty'
import { useUpdatedUser } from '../../hooks/useUser'
import styles from '../../styles'

const otherFaculty = {
  code: 'OTHER',
  name: {
    fi: 'Muu',
    sv: 'Annan',
    en: 'Other',
  },
}

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
  const mutation = useUpdatedUser()

  useEffect(() => {}, [setSearchParams])

  useEffect(() => {
    if (
      !faculties ||
      facultiesLoading ||
      !userFaculties ||
      userFacultiesLoading
    ) {
      setSearchParams({ faculty: otherFaculty.code })
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

  const handleUpdateFaculty = async () => {
    try {
      await mutation.mutate({ preferredFaculty: 'H50' })
      enqueueSnackbar(t('facultySelect:facultyChangeSuccess'), {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar(t('facultySelect:facultyChangeError'), {
        variant: 'error',
      })
    }
  }

  if (!faculties || facultiesLoading) return null

  const sortedFaculties = sortFaculties(faculties, language as keyof Locales)
  const organisations = sortedFaculties.concat(otherFaculty)

  return (
    <>
      <ListSubheader disableSticky>
        {t('navbar:facultySubHeader')}
      </ListSubheader>
      <ListItem sx={{ px: 4, mb: 2 }} disablePadding>
        <FormControl variant='standard' sx={formStyles.formControl}>
          <InputLabel>{t('facultySelect:inputLabel')}</InputLabel>
          <Select
            sx={cardStyles.inputField}
            data-cy='faculty-select'
            label={t('facultySelect:inputLabel')}
            value={faculty?.code || ''}
            size='small'
          >
            {organisations.map((f: Faculty) => (
              <MenuItem
                data-cy={`faculty-option-${f.code}`}
                key={f.code}
                value={f.code}
                onClick={() => {
                  setSearchParams({ faculty: f.code })
                  setFaculty(f)
                  handleUpdateFaculty()
                }}
              >
                {f.name[language as keyof Locales]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ListItem>
    </>
  )
}

export default SelectFaculty
