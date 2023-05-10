import React, { useState } from 'react'

import { Box, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import SelectFaculty from './SelectFaculty'

const MainPage = () => {
  const [faculty, setFaculty] = useState('')

  return (
    <Box>
      <Grid container>
        <Grid item sm={12} md={7} xl={8}>
          <SelectFaculty setFaculty={setFaculty} faculty={faculty} />
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
