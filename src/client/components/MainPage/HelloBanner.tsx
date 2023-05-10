import React from 'react'
import { Box } from '@mui/material'
import styles from '../../styles'

const HelloBanner = () => {
  const { cardStyles } = styles

  return (
    <Box id="hello-component" sx={cardStyles.helloBox}>
      <Box>
        <h2>Welcome to Ipsutin</h2>
        <div style={{ fontSize: '1.1rem' }}>Placeholder text</div>
      </Box>
    </Box>
  )
}

export default HelloBanner
