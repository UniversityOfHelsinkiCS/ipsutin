import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material'
import { grey } from '@mui/material/colors'

import { ProductCardProps } from '../../types'

const ProductCard = ({ title, description, href }: ProductCardProps) => (
  <Card
    elevation={0}
    sx={{
      border: `1px solid ${grey[300]}`,
    }}
  >
    <CardContent
      sx={{ minHeight: { xs: '200px', md: '400px' }, textAlign: 'left' }}
    >
      <Typography
        gutterBottom
        component='p'
        sx={{
          height: {
            md: '200px',
            xl: '150px',
          },
          fontSize: { xs: '18pt', sm: '20pt', md: '24pt', lg: '28pt' },
          textTransform: 'uppercase',
          fontWeight: '700',
          letterSpacing: '-0.1rem',
        }}
      >
        {title}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        {description}
      </Typography>
    </CardContent>
    <CardActions sx={{ margin: 0, padding: 0 }}>
      <Button
        size='small'
        sx={{
          mx: 'auto',
          px: 4,
          mb: 4,
          borderRadius: '1rem',
          textTransform: 'capitalize',
          fontWeight: '600',
          fontSize: '12pt',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
        component={Link}
        to={href}
        variant='contained'
        color='secondary'
      >
        Check
      </Button>
    </CardActions>
  </Card>
)

const ProductGrid = () => {
  const { t } = useTranslation()

  return (
    <Grid
      container
      sx={{ px: { xs: 2, md: 4 }, display: 'flex', gap: { xs: '1rem 0' } }}
    >
      <Grid item xs={12} md={4} lg={4}>
        <ProductCard
          title={t('surveySelectionNames:ipAssessment')}
          description={t('surveyInfos:ipAssessment')}
          imgPath='/'
          href='/ipassessment'
        />
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <ProductCard
          title={t('surveySelectionNames:licences')}
          description={t('surveyInfos:licences')}
          imgPath='/'
          href='/licences'
        />
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <ProductCard
          title={t('surveySelectionNames:ideaEvaluation')}
          description={t('surveyInfos:ideaEvaluation')}
          imgPath='/'
          href='/ideaevaluation'
        />
      </Grid>
    </Grid>
  )
}

export default ProductGrid
