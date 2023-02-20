import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import styles from './styles'
import { InputProps, Locales } from '../../types'
import useFaculties from '../../hooks/useFaculties'

const SelectFaculty: React.FC<InputProps> = ({ control }) => {
  const { t } = useTranslation()
  const language = localStorage.getItem('language') || 'en'
  const [faculty, setFaculty] = useState('')
  const faculties = useFaculties()
  let mockFaculty

  const handleChange = (event: SelectChangeEvent) => {
    setFaculty(event.target.value)
  }

  const classes = styles.cardStyles

  if (!faculties) {
    mockFaculty = [
      {
        fi: 'Matemaattis-luonnontieteellinen tiedekunta',
        en: 'Faculty of Science',
        sv: 'Matematisk-naturvetenskapliga fakulteten',
      },
    ]
  }

  return (
    <Box sx={classes.card}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={classes.heading} component="div">
            {t('facultySelect:welcomeMessage')}
          </Typography>
          <Box sx={classes.content}>
            <Typography variant="body2">
              {t('facultySelect:introMessage')}
            </Typography>
          </Box>
        </CardContent>

        <Controller
          control={control}
          name="faculty"
          defaultValue=""
          render={({ field }) => (
            <FormControl sx={{ width: '100%' }}>
              <InputLabel>{t('facultySelect:inputLabel')}</InputLabel>
              <Select
                data-cy="faculty-select"
                value={faculty}
                label={t('facultySelect:inputLabel')}
                onChange={handleChange}
                {...field}
              >
                {(faculties || mockFaculty).map((f: Locales) => (
                  <MenuItem
                    data-cy={`faculty-option-${f.en}`}
                    key={f.en}
                    value={f.en}
                  >
                    {f[language]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      </Card>
    </Box>
  )
}

export default SelectFaculty
