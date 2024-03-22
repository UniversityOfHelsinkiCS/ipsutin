import { useTranslation } from 'react-i18next'
import { Box, Card, CardMedia, Typography } from '@mui/material'

import placeholder from '../../assets/placeholder.png'
import { useLoggedInUser } from '../../hooks/useUser'

const HeroSection = () => {
  const { t } = useTranslation()

  const { user, isLoading } = useLoggedInUser()

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ position: 'relative', flex: 1 }}>
        <CardMedia
          loading='lazy'
          component='img'
          height='auto'
          alt='' // alt is empty because it is a decorative image
          image={placeholder}
        />
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
