import { Box } from '@mui/material'

const chipsHardcoded = [
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
      <p key={chip.label}>{chip.title}</p>
    ))}
  </Box>
)

export default Chips
