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
      }}
    >
      <Box sx={{ position: 'relative', flex: 1 }}>
        <CardContent>
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
                top: '60%',
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
                <PauseIcon fontSize='small' /> {t('mainPage:pause')}
              </>
            ) : (
              <>
                <PlayArrowIcon fontSize='small' /> {t('mainPage:play')}
              </>
            )}
          </Button>
        </CardActions>
      </Box>
    </Card>
  )
}

export default HeroSection
