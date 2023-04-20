import React from 'react'

import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const MainPage = () => (
  <Typography variant="h6">
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
  </Typography>
)

export default MainPage
