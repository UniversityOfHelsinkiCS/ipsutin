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
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ position: 'relative', flex: 1 }}>
        <CardMedia component='video' autoPlay muted loop>
          <source src={video} type='video/mp4' />
        </CardMedia>
        <Box
          sx={{
            position: 'absolute',
            top: '5%',
            left: '40%',
            color: 'white',
            padding: '10px',
          }}
        >
          <Typography
            component='h1'
            sx={{
              fontSize: { sm: '28pt', md: '34pt', lg: '40pt' },
              fontWeight: 'bold',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            {t('mainPage:mainHeading')}
          </Typography>
          {!isLoading && user ? (
            <Typography
              sx={{
                fontSize: { sm: '16pt', md: '20pt', lg: '24pt' },
                fontWeight: 600,
                maxWidth: '90%',
                color: 'black',
              }}
            >
              {t('mainPage:mainContent', { name: user?.firstName })}
            </Typography>
          ) : null}
        </Box>
      </Box>
    </Card>
  )
}

export default HeroSection
