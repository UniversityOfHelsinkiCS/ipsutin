import { Link } from 'react-router-dom' // Import Link component from react-router-dom
import { Button } from '@mui/material'

import { Service } from '../../types'
import colors from '../../util/colors'

const ServiceLink = ({ service }: { service: Service }) => (
  <Button
    component={Link}
    to={`/services/${service.label}`}
    sx={{
      backgroundColor: colors[service.label as keyof typeof colors]?.background,
      mx: '0.3rem',
      fontWeight: 'normal',
      color: colors[service.label as keyof typeof colors]?.text,
      borderRadius: '0.5rem',
      px: '1rem',
    }}
  >
    {service.label}
  </Button>
)

export default ServiceLink
