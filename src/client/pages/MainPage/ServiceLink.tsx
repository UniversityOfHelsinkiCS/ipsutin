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
      fontWeight: 'normal',
      borderRadius: '0.5rem',
      color: service.colors.text,
      backgroundColor: service.colors.background,
    }}
  >
    {service.label}
  </Button>
)

export default ServiceLink
