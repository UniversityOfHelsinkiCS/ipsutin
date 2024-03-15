import { useEffect, useState } from 'react'
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

const ProductCard = ({
  title,
  description,
  href,
  selected,
  onClick,
}: ProductCardProps) => (
  <Card
    elevation={0}
    sx={{
      border: '1px solid',
      borderColor: 'grey.300',
      backgroundColor: selected ? '#b1cfe3' : 'white',
    }}
    onClick={onClick}
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

  const selectedCard = window.location.href.match(/\/(\w+)\?/)

  const [selectedProduct, setSelectedProduct] = useState(
    selectedCard ? selectedCard[1] : ''
  )

  useEffect(() => {
    setSelectedProduct(selectedCard ? selectedCard[1] : '')
  }, [selectedCard])

  const handleProductCardClick = (title: string) => {
    setSelectedProduct(title)
  }

  return (
    <Grid container sx={{ display: 'flex' }}>
      <Grid item xs={12} md={4} lg={4}>
        <ProductCard
          title={t('surveySelectionNames:ipAssessment')}
          description={t('surveyInfos:ipAssessment')}
          imgPath='/'
          href={`/ipassessment?faculty=${faculty}`}
          selected={selectedProduct === 'ipassessment'}
          onClick={() => handleProductCardClick('ipassessment')}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <ProductCard
          title={t('surveySelectionNames:licences')}
          description={t('surveyInfos:licences')}
          imgPath='/'
          href={`/licences?faculty=${faculty}`}
          selected={selectedProduct === 'licences'}
          onClick={() => handleProductCardClick('licences')}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <ProductCard
          title={t('surveySelectionNames:ideaEvaluation')}
          description={t('surveyInfos:ideaEvaluation')}
          imgPath='/'
          href={`/ideaevaluation?faculty=${faculty}`}
          selected={selectedProduct === 'ideaevaluation'}
          onClick={() => handleProductCardClick('ideaevaluation')}
        />
      </Grid>
    </Grid>
  )
}

export default ProductGrid
