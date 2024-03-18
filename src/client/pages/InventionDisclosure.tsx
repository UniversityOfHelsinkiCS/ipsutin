import React from 'react'
import { Box, Grid, Typography } from '@mui/material'

import InformationChip from '../components/Chip/InformationChip'

const InventionDisclosurePage = () => (
  <Box>
    <Grid container>
      <InformationChip
        title='Invention Disclosure'
        label='disclosure'
        link='/invention_disclosure'
      />
    </Grid>
    <Typography variant='h2'>Hej</Typography>
  </Box>
)
export default InventionDisclosurePage
