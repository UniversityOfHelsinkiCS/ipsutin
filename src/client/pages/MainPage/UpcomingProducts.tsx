import { useTranslation } from 'react-i18next'
import { Grid, Typography } from '@mui/material'

const upcomingProducts = [
  {
    title: 'Student advisor',
    image: 'https://via.placeholder.com/300',
  },
  {
    title: 'Grant writer',
    image: 'https://via.placeholder.com/300',
  },
  {
    title: 'Outreach helper',
    image: 'https://via.placeholder.com/300',
  },
]

const UpcomingProducts = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation()

  return (
    <Grid
      container
      spacing={4}
      sx={{
        maxWidth: '1024px',
        mx: 'auto',
        my: '8rem',
        alignItems: 'center',
      }}
    >
      {upcomingProducts.map((product) => (
        <Grid item xs={12} md={3} key={product.title}>
          <img
            src={product.image}
            alt=''
            width='100px'
            style={{ borderRadius: '50%', marginBottom: '1rem' }}
          />
          <Typography
            component='p'
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: { xs: '18pt', sm: '20pt', md: '24pt' },
            }}
          >
            {product.title}
          </Typography>
        </Grid>
      ))}
      <Grid item xs={12} md={3}>
        <Typography
          component='p'
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: { xs: '18pt', sm: '20pt', md: '24pt' },
          }}
        >
          and more...
        </Typography>
      </Grid>
    </Grid>
  )
}

export default UpcomingProducts
