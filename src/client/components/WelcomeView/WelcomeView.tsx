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
            top: '15%',
            left: '45%',
            width: '100%',
            color: 'white',
            padding: '10px',
          }}
        >
          <Typography
            component='h1'
            sx={{
              fontSize: '40pt',
              fontWeight: 'bold',
            }}
          >
            {header}
          </Typography>
          <Typography
            sx={{
              fontSize: '20pt',
              fontWeight: 600,
            }}
          >
            {subText}
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}
export default WelcomeView
