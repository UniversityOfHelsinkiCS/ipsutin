import { RecommendationLabel } from '@backend/types'
import { Box } from '@mui/material'

import InformationChip from './InformationChip'

interface ChipTypes {
  title: string
  label: RecommendationLabel
  link: string
}

const chipsHardcoded: ChipTypes[] = [
  {
    title: 'Invention Disclosure',
    label: 'disclosure',
    link: '/inventiondisclosure',
  },
  {
    title: 'Idea Clinic',
    label: 'clinic',
    link: '/admin',
  },
  {
    title: 'Industry Relations',
    label: 'relations',
    link: '/admin',
  },
  {
    title: 'Incubator',
    label: 'incubator',
    link: '/admin',
  },
  {
    title: 'Legal',
    label: 'legal',
    link: '/admin',
  },
  {
    title: 'Restrictive',
    label: 'restrictive',
    link: '/admin',
  },
  {
    title: 'Permissive',
    label: 'permissive',
    link: '/admin',
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
    {chipsHardcoded.map((chip) => (
      <InformationChip
        key={chip.title}
        title={chip.title}
        label={chip.label}
        link={chip.link}
      />
    ))}
  </Box>
)

export default ServiceChips
