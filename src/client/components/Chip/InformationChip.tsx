import { Chip } from '@mui/material'

import colors from '../../util/colors'

interface InformationChipProps {
  title: string
  label: string
}

const InformationChip: React.FC<InformationChipProps> = ({ title, label }) => (
  <Chip
    key={label}
    label={title}
    sx={{
      backgroundColor: (colors as any)[label],
      marginX: '0.3rem',
      fontWeight: 'normal',
      color: 'black',
    }}
  />
)

export default InformationChip