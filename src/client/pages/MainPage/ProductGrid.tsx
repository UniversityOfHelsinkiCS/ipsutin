import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material'
import { grey } from '@mui/material/colors'

import { useSelectedFaculty } from '../../hooks/useFaculty'
import { ProductCardProps } from '../../types'

const ProductCard = ({
  title,
  description,
  href,
  selected,
}: ProductCardProps) => (
  <Card
    elevation={0}
    sx={{
      border: (theme) =>
        selected
          ? `2px solid ${theme.palette.secondary.main}`
          : `1px solid ${grey[300]}`,
    }}
  >
    <CardContent sx={{ minHeight: '400px', textAlign: 'left' }}>
      <Typography
        gutterBottom
        component='p'
        sx={{
          mb: 4,
          fontSize: '28pt',
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
    <CardActions>
      <Button
        sx={{
          mx: 'auto',
          px: 4,
          mb: 2,
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
  const { pathname } = useLocation()

  const [selectedProduct, setSelectedProduct] = useState('')

  const faculty = useSelectedFaculty()

  useEffect(() => {
    if (!pathname) return

    setSelectedProduct(pathname)
  }, [pathname])

  return (
    <Grid container sx={{ display: 'flex' }}>
      <Grid item xs={12} md={4} lg={4}>
        <ProductCard
          title={t('surveySelectionNames:ipAssessment')}
          description={t('surveyInfos:ipAssessment')}
          imgPath='/'
          href={`/ipassessment?faculty=${faculty}`}
          selected={selectedProduct === '/ipassessment'}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <ProductCard
          title={t('surveySelectionNames:licences')}
          description={t('surveyInfos:licences')}
          imgPath='/'
          href={`/licences?faculty=${faculty}`}
          selected={selectedProduct === '/licences'}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <ProductCard
          title={t('surveySelectionNames:ideaEvaluation')}
          description={t('surveyInfos:ideaEvaluation')}
          imgPath='/'
          href={`/ideaevaluation?faculty=${faculty}`}
          selected={selectedProduct === '/ideaevaluation'}
        />
      </Grid>
    </Grid>
  )
}

export default ProductGrid
