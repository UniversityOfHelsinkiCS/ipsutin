import React from 'react'

import { Box, Link, Typography } from '@mui/material'

const MainPage = () => (
  <Typography variant="h6">
    <h2>Which of these surveys would you like to use?</h2>
    <Box sx={{ minHeight: 50 }}>
      <Link href="/ipassessment" underline="hover">
        IP Assessment
      </Link>
    </Box>
    <Box sx={{ minHeight: 50 }}>
      <Link href="/licences" underline="hover">
        Licences
      </Link>
    </Box>
    <Box sx={{ minHeight: 50 }}>
      <Link href="/ideaevaluation" underline="hover">
        Idea Evaluation
      </Link>
    </Box>
  </Typography>
)

export default MainPage
