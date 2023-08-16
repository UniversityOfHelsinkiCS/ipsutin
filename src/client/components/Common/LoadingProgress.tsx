import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

const LoadingProgress = () => (
  <Box
    display='flex'
    justifyContent='center'
    alignItems='center'
    minHeight='80vh'
  >
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <CircularProgress />
      <Typography variant='body2' sx={{ my: 4 }}>
        Crunching the latest data for you
      </Typography>
    </Box>
  </Box>
)

export default LoadingProgress
