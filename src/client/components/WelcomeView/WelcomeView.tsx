import { Box, Card, CardMedia, Typography } from '@mui/material'

import placeholder from '../../assets/placeholder.png'

const WelcomeView = () => {
  const header = 'Ai is the best... when it works'
  const subText = 'Ai works for almost everything, but almost never'
  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia component='img' height='fill' image={placeholder} />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.54)',
            color: 'white',
            padding: '10px',
          }}
        >
          <Typography variant='h5'>{header}</Typography>
          <Typography variant='body2'>{subText}</Typography>
        </Box>
      </Box>
    </Card>
  )
}
export default WelcomeView
