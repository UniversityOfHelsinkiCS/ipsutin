import { useState } from 'react'
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
      backgroundColor: selected ? '#b1cfe3' : 'white', // Change background color based on selected prop
    }}
    onClick={onClick} // Use onClick prop to handle click event
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
  const currentUrl = window.location.href
  console.log('current URl: ', currentUrl)
  const [selectedProduct, setSelectedProduct] = useState('') // Track the selected ProductCard index

  // Function to handle ProductCard selection
  const handleProductCardClick = (title: string) => {
    setSelectedProduct(title)
  }

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
          selected={t('surveySelectionNames:ipAssessment') === selectedProduct} // Pass whether this ProductCard is selected or not
          onClick={() =>
            handleProductCardClick(t('surveySelectionNames:ipAssessment'))
          } // Pass the function to handle selection
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <ProductCard
          title={t('surveySelectionNames:licences')}
          description={t('surveyInfos:licences')}
          imgPath='/'
          href={`/licences?faculty=${faculty}`}
          selected={t('surveySelectionNames:licences') === selectedProduct} // Pass whether this ProductCard is selected or not
          onClick={() =>
            handleProductCardClick(t('surveySelectionNames:licences'))
          } // Pass the function to handle selection
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <ProductCard
          title={t('surveySelectionNames:ideaEvaluation')}
          description={t('surveyInfos:ideaEvaluation')}
          imgPath='/'
          href={`/ideaevaluation?faculty=${faculty}`}
          selected={
            t('surveySelectionNames:ideaEvaluation') === selectedProduct
          } // Pass whether this ProductCard is selected or not
          onClick={() =>
            handleProductCardClick(t('surveySelectionNames:ideaEvaluation'))
          } // Pass the function to handle selection
        />
      </Grid>
    </Grid>
  )
}

export default ProductGrid
