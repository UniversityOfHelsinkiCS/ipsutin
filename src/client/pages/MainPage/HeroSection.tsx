import { useTranslation } from 'react-i18next'
import { Box, Card, CardMedia, Typography } from '@mui/material'

import video from '../../assets/hero_section_video.mp4'
import { useLoggedInUser } from '../../hooks/useUser'

const HeroSection = () => {
  const { t } = useTranslation()

  const { user, isLoading } = useLoggedInUser()

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ position: 'relative', flex: 1 }}>
        <CardMedia component='video' autoPlay muted loop>
          <source src={video} type='video/mp4' />
        </CardMedia>

        <Typography
          component='h1'
          sx={{
            position: 'absolute',
            top: '10%',
            left: '40%',
            color: 'white',
            fontSize: { xs: '28pt', sm: '32pt', md: '40pt', xl: '56pt' },
            fontWeight: 'bold',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          {t('mainPage:mainHeading')}
        </Typography>

        {!isLoading && user && (
          <Typography
            sx={{
              position: 'absolute',
              top: '70%',
              left: '40%',

              fontSize: { xs: '12pt', sm: '16pt', md: '20pt', lg: '24pt' },
              fontWeight: 600,
              maxWidth: '70%',
              color: 'white',
            }}
          >
            {t('mainPage:mainContent', { name: user?.firstName })}
          </Typography>
        )}
      </Box>
    </Card>
  )
}

export default HeroSection
