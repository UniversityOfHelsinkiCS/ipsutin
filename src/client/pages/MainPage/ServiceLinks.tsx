import { Link } from 'react-router-dom' // Import Link component from react-router-dom
import { Box, Button, getContrastRatio } from '@mui/material'

import { Service } from '../../types'

const services: Service[] = [
  {
    id: 'disclosure',
    label: 'disclosure',
    title: {
      fi: 'Invention disclosure',
      en: 'Invention disclosure',
      sv: 'Invention disclosure',
    },
    colors: {
      background: '#ed1975',
    },
  },
  {
    id: 'clinic',
    label: 'clinic',
    title: {
      fi: 'Idea clinic',
      en: 'Idea clinic',
      sv: 'Idea clinic',
    },
    colors: {
      background: '#8261a1',
    },
  },
  {
    id: 'relations',
    label: 'relations',
    title: {
      fi: 'Industry relations',
      en: 'Industry relations',
      sv: 'Industry relations',
    },
    colors: {
      background: '#23439b',
    },
  },
  {
    id: 'incubator',
    label: 'incubator',
    title: {
      fi: 'Incubator',
      en: 'Incubator',
      sv: 'Incubator',
    },
    colors: {
      background: '#199995',
    },
  },
  {
    id: 'legal',
    label: 'legal',
    title: {
      fi: 'Legal',
      en: 'Legal',
      sv: 'Legal',
    },
    colors: {
      background: '#afd255',
    },
  },
]

const ServiceLink = ({ service }: { service: Service }) => (
  <Button
    size='small'
    component={Link}
    to={`/services/${service.id}`}
    sx={{
      mx: '0.5rem',
      px: { xs: '0.5rem', md: '2rem' },
      borderRadius: '0.5rem',
      border: `1px solid ${service.colors.background}`,
      color:
        getContrastRatio(service.colors.background, '#fff') > 4.5
          ? '#fff'
          : '#000',
      backgroundColor: service.colors.background,
      fontSize: { xs: '12pt', md: '16pt' },
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

const ServiceLinks = () => (
  <Box
    sx={{
      mt: 2,
      mx: { xs: 1, md: 4 },
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem 0',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {services.map((service) => (
      <ServiceLink key={service.label} service={service} />
    ))}
  </Box>
)

export default ServiceLinks
