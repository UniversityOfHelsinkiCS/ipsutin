import { Box, Card, CardMedia, Typography } from '@mui/material'

import placeholder from '../../assets/placeholder.png'

const WelcomeView = () => {
  const header = 'MAKE A DIFFERENCE IN THE WORLD'
  const subText =
    'With Innotin, you can explore how to proceed with an idea, gaining insights and learning concrete steps to take.'
  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          loading='lazy'
          component='img'
          height='650px'
          image={placeholder}
        />
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
              fontSize: '34pt',
              fontWeight: 'bold',
            }}
          >
            {header}
          </Typography>
          <Typography
            sx={{
              fontSize: '20pt',
              fontWeight: 600,
              maxWidth: '600pt',
              color: 'black',
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
