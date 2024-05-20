import { Grid, Typography } from '@mui/material'

const upcomingProducts = [
  {
    title: 'Student advisor',
    image: 'src/client/assets/student_advisor.webp',
  },
  {
    title: 'Grant writer',
    image: 'src/client/assets/grant_writer.webp',
  },
  {
    title: 'Outreach helper',
    image: 'src/client/assets/outreach_helper.webp',
  },
]

const UpcomingProducts = () => (
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

export default UpcomingProducts
