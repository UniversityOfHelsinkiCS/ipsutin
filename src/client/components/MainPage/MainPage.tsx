import React, { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import SelectFaculty from './SelectFaculty'
import HelloBanner from './HelloBanner'
import styles from '../../styles'
import SelectSurvey from './SelectSurvey'
import Tools from './Tools'
import Licences from '../Licenses/Licenses'
import IpAssessment from '../IpAssessment/IpAssessment'
import IdeaEvaluation from '../IdeaEvaluation/IdeaEvaluation'

const MainPage = () => {
  const { formStyles } = styles
  const navigate = useNavigate()
  const location = useLocation()
  const [faculty, setFaculty] = useState('')
  const [survey, setSurvey] = useState('')

  useEffect(() => {
    navigate(`/${survey}`)
  }, [survey, navigate])

  return (
    <Box sx={formStyles.formWrapper}>
      <Grid container>
        <Grid item sm={12}>
          <HelloBanner />
        </Grid>
        <Grid
          container
          item
          sm={12}
          md={7}
          xl={8}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Grid item xl={12}>
            <Box sx={{ mx: 2, display: 'flex' }}>
              <SelectFaculty setFaculty={setFaculty} faculty={faculty} />
              {faculty && (
                <SelectSurvey setSurvey={setSurvey} surveyName={survey} />
              )}
            </Box>
            {location.pathname === '/licences' && (
              <Licences faculty={faculty} />
            )}
            {location.pathname === '/ipassessment' && (
              <IpAssessment faculty={faculty} />
            )}
            {location.pathname === '/ideaevaluation' && (
              <IdeaEvaluation faculty={faculty} />
            )}
          </Grid>
        </Grid>
        <Grid item sm={12} md={5} xl={3}>
          <Tools />
        </Grid>
      </Grid>
    </Box>
  )
}
export default MainPage
