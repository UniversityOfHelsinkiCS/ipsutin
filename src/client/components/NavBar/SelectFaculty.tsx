import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
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

import { useFaculties } from '../../hooks/useFaculty'
import { useLoggedInUser, useUpdatedUser } from '../../hooks/useUser'
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

  const { user } = useLoggedInUser()
  const { faculties, isLoading: facultiesLoading } = useFaculties()

  const [faculty, setFaculty] = useState<string>(
    user?.preferredFaculty || 'OTHER'
  )

  const mutation = useUpdatedUser()

  const { language } = i18n
  const { cardStyles, formStyles } = styles

  const handleUpdateFaculty = async (event: any) => {
    setFaculty(event.target.value)

    try {
      mutation.mutate({ preferredFaculty: event.target.value })
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
            value={faculty}
            size='small'
            onChange={handleUpdateFaculty}
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
      </ListItem>
    </>
  )
}

export default SelectFaculty
