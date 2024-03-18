import { Link } from 'react-router-dom' // Import Link component from react-router-dom
import { RecommendationLabel } from '@backend/types'
import { Button } from '@mui/material'

import colors from '../../util/colors'

interface InformationChipProps {
  title: string
  label: RecommendationLabel
  link: string | null
}

const InformationChip = ({ title, label, link }: InformationChipProps) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {link ? (
      <Link to={link} style={{ textDecoration: 'none' }}>
        <Button
          key={title}
          sx={{
            backgroundColor: colors[label as keyof typeof colors]?.background,
            marginX: '0.3rem',
            fontWeight: 'normal',
            color: colors[label as keyof typeof colors]?.text,
            borderRadius: '0.5rem',
            padding: '10px',
          }}
        >
          {label}
        </Button>
      </Link>
    ) : (
      <Button
        key={title}
        disabled
        sx={{
          backgroundColor: colors[label as keyof typeof colors]?.background,
          marginX: '0.3rem',
          fontWeight: 'normal',
          color: colors[label as keyof typeof colors]?.text,
          borderRadius: '0.5rem',
          padding: '10px',
        }}
      >
        {label}
      </Button>
    )}
  </>
)

export default InformationChip
