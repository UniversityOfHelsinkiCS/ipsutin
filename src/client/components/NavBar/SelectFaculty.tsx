import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Faculty, Locales } from '@backend/types'
import CheckIcon from '@mui/icons-material/Check'
import { ListSubheader, MenuItem } from '@mui/material'
import { enqueueSnackbar } from 'notistack'

import { useFaculties } from '../../hooks/useFaculty'
import { useLoggedInUser, useUpdatedUser } from '../../hooks/useUser'

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

  const handleUpdateFaculty = async (newFacultyCode: string) => {
    setFaculty(newFacultyCode)

    try {
      mutation.mutate({ preferredFaculty: newFacultyCode })
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
      {organisations.map((f: Faculty) => (
        <MenuItem
          data-cy={`faculty-option-${f.code}`}
          onClick={() => handleUpdateFaculty(f.code)}
          key={f.code}
          value={f.code}
          sx={{ justifyContent: 'space-between', px: 4 }}
        >
          {f.name[language as keyof Locales]}{' '}
          {f.code === faculty && <CheckIcon color='primary' />}
        </MenuItem>
      ))}
    </>
  )
}

export default SelectFaculty
