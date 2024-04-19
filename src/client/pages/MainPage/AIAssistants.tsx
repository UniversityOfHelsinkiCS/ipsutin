import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button, Grid, Typography } from '@mui/material'

import assistantIcon from '../../assets/inventors_assistant_icon.png'
import SectionHeading from '../../components/Common/SectionHeading'

const AIAssistants = () => {
  const { t } = useTranslation()

  return (
    <Grid
      container
      sx={{
        maxWidth: '1024px',
        mx: 'auto',
        px: { xs: 1, md: 8 },
        minHeight: '400px',
        alignItems: 'center',
      }}
    >
      <Grid item xs={12} md={4}>
        <img
          src={assistantIcon}
          alt=''
          width='100'
          style={{ borderRadius: '50%', marginBottom: '1rem' }}
        />
        <SectionHeading
          level='h3'
          sx={{ fontSize: { xs: '20pt', sm: '24pt', md: '32pt' } }}
        >
          {t('inventorsAssistant:mainHeading')}
        </SectionHeading>
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography sx={{ fontSize: '18pt', pt: 8 }}>
          &quot;{t('inventorsAssistant:description')}&quot;
        </Typography>
        <Button
          size='large'
          component={Link}
          to='/inventors-assistant'
          sx={{
            mx: 'auto',
            px: 4,
            my: 8,
            borderRadius: '1rem',
            textTransform: 'capitalize',
            fontWeight: '600',
            fontSize: { xs: '14pt', md: '16pt' },
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
          variant='contained'
          color='secondary'
        >
          Go to Inventors assistant
        </Button>
      </Grid>
    </Grid>
  )
}

export default AIAssistants
