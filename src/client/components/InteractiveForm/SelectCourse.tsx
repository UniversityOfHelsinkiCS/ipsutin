import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Box } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import styles from '../../styles'
import { Course, InputProps, Locales } from '../../types'
import Markdown from '../Common/Markdown'
import useUserCourses from '../../hooks/useUserCourses'
// import LoadingProgress from '../Common/LoadingProgress'

const otherCourse = {
  id: 'OTHER',
  code: '',
  name: {
    fi: 'Muu kurssi',
    sv: 'Other course',
    en: 'Other course',
  },
}

const sortCourses = (courses: Course[] = []) => {
  const sortedCourses = courses.sort((a, b) => {
    if (a.code > b.code) return 1
    if (a.code < b.code) return -1

    return 0
  })

  return sortedCourses
}

const SelectCourse = ({ control }: InputProps) => {
  const { t, i18n } = useTranslation()
  const { language } = i18n
  const [course, setCourse] = useState('')
  const { userCourses, isLoading } = useUserCourses()

  const handleChange = (event: SelectChangeEvent) => {
    setCourse(event.target.value)
  }

  // if (isLoading) return <LoadingProgress />
  if (isLoading || userCourses.length === 0) return null

  const { cardStyles, formStyles } = styles

  const sortedCourses = sortCourses(userCourses).concat(otherCourse)

  return (
    <Box sx={cardStyles.card}>
      <Box sx={cardStyles.content}>
        <Markdown>{t('courseSelect:introMessage')}</Markdown>
      </Box>

      <Controller
        control={control}
        name="course"
        defaultValue=""
        render={({ field }) => (
          <FormControl sx={formStyles.formControl}>
            <InputLabel>{t('courseSelect:inputLabel')}</InputLabel>
            <Select
              data-cy="course-select"
              value={course}
              label={t('courseSelect:inputLabel')}
              onChange={handleChange}
              {...field}
            >
              {sortedCourses.map((c: Course) => (
                <MenuItem
                  data-cy={`course-option-${c.id}`}
                  key={c.id}
                  value={c.id}
                >
                  {c.code} {c.name[language as keyof Locales]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </Box>
  )
}

export default SelectCourse
