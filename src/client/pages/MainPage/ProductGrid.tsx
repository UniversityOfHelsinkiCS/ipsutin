import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material'

import { useSelectedFaculty } from '../../hooks/useFaculty'
import { ProductCardProps } from '../../types'

import IntroCard from './IntroCard'

const ProductCard = ({ title, description, href }: ProductCardProps) => (
  <Card
    elevation={0}
    sx={{
      border: '1px solid',
      borderColor: 'grey.300',
    }}
  >
    <CardActionArea component={Link} to={href}>
      <CardContent sx={{ height: '325px' }}>
        <Typography
          gutterBottom
          variant='h4'
          component='p'
          sx={{ mb: 4, textTransform: 'uppercase', fontWeight: '600' }}
        >
          {title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
)

const ProductGrid = () => {
  const { t } = useTranslation()
  const faculty = useSelectedFaculty()

  return (
    <Grid container sx={{ display: 'flex' }}>
      <Grid item xs={12} md={6} lg={3}>
        <IntroCard />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <ProductCard
          title={t('surveySelectionNames:ipAssessment')}
          description={t('surveyInfos:ipAssessment')}
          imgPath='/'
          href={`/ipassessment?faculty=${faculty}`}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <ProductCard
          title={t('surveySelectionNames:licences')}
          description={t('surveyInfos:licences')}
          imgPath='/'
          href={`/licences?faculty=${faculty}`}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <ProductCard
          title={t('surveySelectionNames:ideaEvaluation')}
          description={t('surveyInfos:ideaEvaluation')}
          imgPath='/'
          href={`/ideaevaluation?faculty=${faculty}`}
        />
      </Grid>
    </Grid>
  )
}

export default ProductGrid
