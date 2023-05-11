import React from 'react'

import { Box, Typography } from '@mui/material'
import styles from '../../styles'

const Tools = () => {
  const { recommendationStyles, cardStyles } = styles
  return (
    <Box sx={recommendationStyles.recommendationContainer}>
      <Typography
        data-cy="recommendation-section-title"
        variant="h5"
        sx={cardStyles.heading}
        component="span"
      >
        Tools
      </Typography>
      <Box sx={recommendationStyles.recommendationBox}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
        consequat pharetra ipsum, a varius purus consectetur in. Aliquam
        suscipit, ipsum eu cursus vehicula, lorem orci gravida felis, ut
        suscipit elit dolor in ante. Donec lectus odio, laoreet blandit nibh a,
        euismod vehicula urna. Phasellus eget porta augue, vel porttitor risus.
        Vivamus euismod ipsum ultrices justo malesuada semper. Proin ullamcorper
        semper finibus. Nam varius ligula augue, sagittis malesuada elit
        vulputate eget.
      </Box>
      <Box sx={recommendationStyles.recommendationBox}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
        consequat pharetra ipsum, a varius purus consectetur in. Aliquam
        suscipit, ipsum eu cursus vehicula, lorem orci gravida felis, ut
        suscipit elit dolor in ante. Donec lectus odio, laoreet blandit nibh a,
        euismod vehicula urna. Phasellus eget porta augue, vel porttitor risus.
        Vivamus euismod ipsum ultrices justo malesuada semper. Proin ullamcorper
        semper finibus. Nam varius ligula augue, sagittis malesuada elit
        vulputate eget.
      </Box>
    </Box>
  )
}

export default Tools
