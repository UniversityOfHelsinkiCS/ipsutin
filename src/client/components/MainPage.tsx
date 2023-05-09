import React from 'react'

import { useForm } from 'react-hook-form'
import { Box, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import SelectFaculty from './SelectFaculty'

const MainPage = () => {
  const { control, watch } = useForm({
    mode: 'onBlur',
    shouldUnregister: false,
  })

  const selectedFaculty = watch('faculty')
  console.log(selectedFaculty)

  return (
    <Box>
      <Grid container>
        <Grid item sm={12} md={7} xl={8}>
          <SelectFaculty control={control} watch={watch} />
        </Grid>
        <Grid item sm={12} md={5} xl={4}>
          <h2>Which of these surveys would you like to use?</h2>
          <Box sx={{ minHeight: 50 }}>
            <Link to="/ipassessment">IP Assessment</Link>
          </Box>
          <Box sx={{ minHeight: 50 }}>
            <Link to="/licences">Licences</Link>
          </Box>
          <Box sx={{ minHeight: 50 }}>
            <Link to="/ideaevaluation">Idea Evaluation</Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
export default MainPage
