import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'

import illustration from '../../../assets/inventors_assistant_illustration.png'
import SectionHeading from '../../../components/Common/SectionHeading'

const InventorsAssistant = () => {
  const { t } = useTranslation()

  return (
    <Box component='article'>
      <Box component='section' sx={{ position: 'relative', width: '100vw' }}>
        <img aria-hidden alt='' src={illustration} height='100%' width='100%' />
        <Typography
          component='h1'
          sx={{
            position: 'absolute',
            top: { xs: '40%', sm: '50%', lg: '60%' },
            left: '40%',
            paddingRight: { xs: '1rem', sm: '2rem', md: '4rem' },
            color: 'black',
            fontSize: {
              xs: '20pt',
              sm: '24pt',
              md: '32pt',
              lg: '40pt',
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

      <Box component='section' sx={{ maxWidth: '1024px', mx: 'auto', my: 8 }}>
        <SectionHeading level='h2'>
          {t('inventorsAssistant:mainSubHeading')}
        </SectionHeading>
        <Typography component='p' variant='body1'>
          {t('inventorsAssistant:mainContent')}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            sx={{
              mx: 'auto',
              px: 12,
              my: 4,
              borderRadius: '1rem',
              textTransform: 'capitalize',
              fontWeight: '600',
              fontSize: '12pt',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
            component={Link}
            to='./step-1'
            variant='contained'
            color='secondary'
          >
            Check
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default InventorsAssistant
