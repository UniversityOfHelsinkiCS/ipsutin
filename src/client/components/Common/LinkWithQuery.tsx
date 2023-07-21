import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@mui/material'

interface LinkWithQueryProps {
  to: string
  children: React.ReactNode
}

const LinkWithQuery = ({ to, children, ...rest }: LinkWithQueryProps) => {
  const { search } = useLocation()

  return (
    <Button variant='contained' component={Link} to={to + search} {...rest}>
      {children}
    </Button>
  )
}

export default LinkWithQuery
