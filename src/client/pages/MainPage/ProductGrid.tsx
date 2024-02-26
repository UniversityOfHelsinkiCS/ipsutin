import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  createSearchParams,
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { ProductCardProps } from '@frontend/types'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material'

import IntroCard from './IntroCard'

const ProductCard = ({
  title,
  description,
  href,
  imgPath,
}: ProductCardProps) => (
  <Card
    elevation={0}
    sx={{
      border: '1px solid',
      borderColor: 'grey.300',
    }}
  >
    <CardActionArea component={Link} to={href}>
      <CardMedia component='img' height='140' image={imgPath} alt={title} />
      <CardContent sx={{ height: '325px' }}>
        <Typography gutterBottom variant='h5' component='div'>
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
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const faculty = searchParams.get('faculty')

  useEffect(() => {
    if (!faculty || faculty === 'null') return

    const params = { faculty }

    navigate({
      pathname: location.pathname,
      search: `?${createSearchParams(params)}`,
    })
  }, [faculty, location.pathname, navigate, searchParams])

  if (faculty === 'null') return null

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
