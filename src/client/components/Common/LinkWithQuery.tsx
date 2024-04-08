import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Button, SxProps, Theme } from '@mui/material'

interface LinkWithQueryProps {
  to: string
  sx?: SxProps<Theme>
  children: React.ReactNode
}

const LinkWithQuery = ({ to, children, sx, ...rest }: LinkWithQueryProps) => {
  const { search } = useLocation()

  return (
    <Button
      variant='contained'
      target='_blank'
      component={Link}
      to={to + search}
      sx={{
        borderRadius: '0.5rem',
        '&:hover': {
          textDecoration: 'underline',
        },
        ...sx,
      }}
      endIcon={<OpenInNewIcon />}
      {...rest}
    >
      {children}
    </Button>
  )
}

export default LinkWithQuery
