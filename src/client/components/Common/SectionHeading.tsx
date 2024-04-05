import { Typography } from '@mui/material'
import { SxProps } from '@mui/material/styles'

type SectionHeadingProps = {
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: React.ReactNode
  sx?: SxProps
}

const SectionHeading = ({
  level,
  sx,
  children,
  ...props
}: SectionHeadingProps) => {
  const fontSize = {
    h1: '28pt',
    h2: '24pt',
    h3: '20pt',
    h4: '18pt',
    h5: '16pt',
    h6: '14pt',
  }

  return (
    <Typography
      component={level}
      sx={{
        mb: 2,
        fontSize: fontSize[level],
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '-0.1rem',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  )
}

export default SectionHeading
