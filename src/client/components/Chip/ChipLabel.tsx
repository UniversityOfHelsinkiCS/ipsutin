import { Box, Chip } from '@mui/material'

import colors from '../../util/colors'

interface ChipTypes {
  title: string
  label: string
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
    label: 'relation',
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
  <Box sx={{ mt: 2, mx: 4 }}>
    {chipsHardcoded.map((chip) => (
      <Chip
        key={chip.label}
        label={chip.title}
        sx={{
          backgroundColor: (colors as any)[chip.label],
          marginX: '0.3rem',
          fontWeight: 'normal',
          color: 'black',
        }}
      />
    ))}
  </Box>
)

export default Chips
