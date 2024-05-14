import { Box, Typography } from '@mui/material'
import { t } from 'i18next'

import illustration from '../../assets/inventors_assistant_illustration.jpg'

const InventorsIllustration = () => (
  <Box component='section' sx={{ position: 'relative', width: '100vw' }}>
    <img
      aria-hidden
      alt=''
      loading='lazy'
      src={illustration}
      width='100%'
      style={{ aspectRatio: '16/9', maxHeight: '1480px' }}
    />
    <Typography
      component='h1'
      sx={{
        position: 'absolute',
        top: { xs: '40%', sm: '60%' },
        left: '40%',
        paddingRight: { xs: '1rem', sm: '2rem', md: '4rem' },
        color: '#fff',
        backgroundColor: 'fff',
        textShadow:
          '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
        fontSize: {
          xs: '26pt',
          sm: '32pt',
          md: '38pt',
          lg: '46pt',
          xl: '52pt',
        },
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: '1rem',
      }}
    >
      {t('inventorsAssistant:mainHeading')}
    </Typography>
  </Box>
)

export default InventorsIllustration
