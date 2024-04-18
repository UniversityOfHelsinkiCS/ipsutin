import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button, Grid, Typography } from '@mui/material'

import SectionHeading from '../../components/Common/SectionHeading'

const AIAssistants = () => {
  const { t } = useTranslation()

  return (
    <Grid
      container
      sx={{
        maxWidth: '1024px',
        mx: 'auto',
        px: 8,
        height: '400px',
        alignItems: 'center',
      }}
    >
      <Grid item sm={12} md={4}>
        <SectionHeading level='h3'>
          {t('inventorsAssistant:mainHeading')}
        </SectionHeading>
      </Grid>
      <Grid item sm={12} md={8}>
        <Typography sx={{ fontSize: '18pt' }}>
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
            fontSize: '16pt',
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
