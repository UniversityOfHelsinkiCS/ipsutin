import React from 'react'
import { Box, Grid } from '@mui/material'

import InformationChip from '../components/Chip/InformationChip'
import styles from '../styles'

const InventionDisclosurePage = () => {
  const { formStyles } = styles

  return (
    <Box sx={formStyles.formWrapper}>
      <Grid container>
        <InformationChip
          title='Invention Disclosure'
          label='disclosure'
          link='/invention_disclosure'
        />
      </Grid>
    </Box>
  )
}
export default InventionDisclosurePage
