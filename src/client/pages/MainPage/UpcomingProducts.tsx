import { Grid, Typography } from '@mui/material'

import grantWriter from '../../assets/grant_writer.webp'
import outreachHelper from '../../assets/outreach_helper.webp'
import studentAdvisor from '../../assets/student_advisor.webp'

const upcomingProducts = [
  {
    title: 'Student advisor',
    image: studentAdvisor,
  },
  {
    title: 'Grant writer',
    image: grantWriter,
  },
  {
    title: 'Outreach helper',
    image: outreachHelper,
  },
]

const UpcomingProducts = () => (
  <Grid
    container
    sx={{
      maxWidth: '1024px',
      display: 'flex',
      gap: { xs: '4rem 0' },
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
