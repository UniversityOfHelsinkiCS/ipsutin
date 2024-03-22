import { Box } from '@mui/material'

import { Service } from '../../types'

import ServiceLink from './ServiceLink'

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
      text: '#000',
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
      text: '#fff',
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
      text: '#fff',
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
      text: '#000',
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
      text: '#000',
    },
  },
]

const ServiceChips = () => (
  <Box
    sx={{
      mt: 2,
      mx: 4,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {services.map((service) => (
      <ServiceLink key={service.label} service={service} />
    ))}
  </Box>
)

export default ServiceChips
