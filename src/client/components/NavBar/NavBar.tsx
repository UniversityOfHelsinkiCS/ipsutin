import React from 'react'

import { AppBar, Toolbar, Box, Container, Typography } from '@mui/material'

import styles from '../../styles'

const NavBar = () => {
  const { navStyles } = styles

  return (
    <AppBar elevation={0} position="relative" sx={navStyles.appbar}>
      <Container maxWidth={false}>
        <Toolbar sx={navStyles.toolbar} disableGutters>
          <Box ml="3rem">
            <Typography sx={navStyles.appName}>Ipsutin</Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar
