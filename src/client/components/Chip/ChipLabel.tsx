import { RecommendationLabel } from '@backend/types'
import { Box } from '@mui/material'

import InformationChip from './InformationChip'

interface ChipTypes {
  title: string
  label: RecommendationLabel
}

const chipsHardcoded: ChipTypes[] = [
  {
    title: 'Invention Disclosure',
    label: 'disclosure',
  },
  {
    title: 'Idea Clinic',
    label: 'clinic',
  },
  {
    title: 'Industry Relations',
    label: 'relations',
  },
  {
    title: 'Incubator',
    label: 'incubator',
  },
  {
    title: 'Legal',
    label: 'legal',
  },
  {
    title: 'Restrictive',
    label: 'restrictive',
  },
  {
    title: 'Permissive',
    label: 'permissive',
  },
]

const Chips = () => (
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
      <InformationChip key={chip.title} title={chip.title} label={chip.label} />
    ))}
  </Box>
)

export default Chips
