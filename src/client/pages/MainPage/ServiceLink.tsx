import { Link } from 'react-router-dom' // Import Link component from react-router-dom
import { Button } from '@mui/material'

import { Service } from '../../types'

const ServiceLink = ({ service }: { service: Service }) => (
  <Button
    size='small'
    component={Link}
    to={`/services/${service.label}`}
    sx={{
      mx: '0.3rem',
      px: '1rem',
      borderRadius: '0.5rem',
      border: `1px solid ${service.colors.background}`,
      color: service.colors.text,
      backgroundColor: service.colors.background,
      '&:hover': {
        textDecoration: 'underline',
        border: `1px solid ${service.colors.background}`,
        color: 'black',
      },
    }}
  >
    {service.label}
  </Button>
)

export default ServiceLink
