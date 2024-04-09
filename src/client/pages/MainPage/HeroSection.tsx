import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'

import video from '../../assets/hero_section_video.mp4'
import { useLoggedInUser } from '../../hooks/useUser'

const HeroSection = () => {
  const { t } = useTranslation()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)

  const { user, isLoading } = useLoggedInUser()

  const handleVideoPlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setPlaying((previous) => !previous)
    }
  }

  const handleVideoPause = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      setPlaying((previous) => !previous)
    }
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '800px',
      }}
    >
      <Box sx={{ position: 'relative', flex: 1 }}>
        <CardContent sx={{ padding: 0, margin: 0 }}>
          <Typography
            component='h1'
            sx={{
              position: 'absolute',
              top: { xs: '5%', md: '30%' },
              left: '40%',
              paddingRight: { xs: '1rem', sm: '2rem', md: '4rem' },
              color: 'white',
              fontSize: {
                xs: '20pt',
                sm: '24pt',
                md: '32pt',
                lg: '40pt',
                xl: '56pt',
              },
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
                visibility: { xs: 'hidden', sm: 'visible' },
                position: 'absolute',
                top: { sm: '50%', md: '60%' },
                left: { sm: '40%', md: '45%' },
                paddingRight: { sm: '2rem', md: '4rem' },
                fontSize: { sm: '12pt', md: '16pt', lg: '24pt' },
                fontWeight: 600,
                maxWidth: { md: '70%' },
                color: 'white',
              }}
            >
              {t('mainPage:mainContent', { name: user?.firstName })}
            </Typography>
          )}
        </CardContent>

        <CardMedia
          ref={videoRef}
          aria-hidden
          component='video'
          autoPlay
          muted
          loop
        >
          <source src={video} type='video/mp4' />
        </CardMedia>

        <CardActions sx={{ position: 'absolute', bottom: '2%', right: '2%' }}>
          <Button
            type='button'
            onClick={playing ? handleVideoPause : handleVideoPlay}
            sx={{
              lineHeight: '1.5rem',
              borderRadius: '0.2rem',
              color: 'white',
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'white',
                color: 'black',
              },
            }}
          >
            {playing ? (
              <>
                <PauseIcon fontSize='small' />{' '}
                <span>{t('mainPage:pauseVideo')}</span>
              </>
            ) : (
              <>
                <PlayArrowIcon fontSize='small' /> {t('mainPage:playVideo')}
              </>
            )}
          </Button>
        </CardActions>
      </Box>
    </Card>
  )
}

export default HeroSection
