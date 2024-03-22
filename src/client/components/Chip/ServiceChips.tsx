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
  },
  {
    id: 'clinic',
    label: 'clinic',
    title: {
      fi: 'Idea clinic',
      en: 'Idea clinic',
      sv: 'Idea clinic',
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
  },
  {
    id: 'incubator',
    label: 'incubator',
    title: {
      fi: 'Incubator',
      en: 'Incubator',
      sv: 'Incubator',
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
