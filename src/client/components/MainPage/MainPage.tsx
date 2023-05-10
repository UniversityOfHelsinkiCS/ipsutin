import React, { useState } from 'react'

import { Box, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import SelectFaculty from './SelectFaculty'
import HelloBanner from './HelloBanner'
import styles from '../../styles'
import ShowMore from '../Common/ShowMore'

const MainPage = () => {
  const { formStyles } = styles
  const [faculty, setFaculty] = useState('')

  return (
    <Box sx={formStyles.formWrapper}>
      <Grid container>
        <Grid item sm={12}>
          <HelloBanner />
        </Grid>
        <Grid
          item
          sm={12}
          md={7}
          xl={6}
          sx={{ px: 2, display: 'flex', justifyContent: 'center' }}
        >
          <SelectFaculty setFaculty={setFaculty} faculty={faculty} />
        </Grid>
        <Grid item sm={12} md={5} xl={6}>
          <h2>Which of these surveys would you like to use?</h2>
          <Box sx={{ minHeight: 50 }}>
            <Link to="/ipassessment">IP Assessment</Link>
            <ShowMore text="placeholder description" />
          </Box>
          <Box sx={{ minHeight: 50 }}>
            <Link to="/licences">Licences</Link>
            <ShowMore text="placeholder description" />
          </Box>
          <Box sx={{ minHeight: 50 }}>
            <Link to="/ideaevaluation">Idea Evaluation</Link>
            <ShowMore text="placeholder description" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
export default MainPage
