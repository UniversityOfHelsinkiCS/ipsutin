import React from 'react'
import { useTranslation } from 'react-i18next'
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'

import hyLogo from '../../assets/hy_logo.svg'
import styles from '../../styles'

const NavBar = () => {
  const { t } = useTranslation()

  const { navStyles } = styles

  return (
    <AppBar elevation={0} position='relative' sx={navStyles.appbar}>
      <Container maxWidth={false}>
        <Toolbar sx={navStyles.toolbar} disableGutters>
          <Box sx={navStyles.navBox}>
            <img src={hyLogo} alt='University of Helsinki' width='40' />
            <Box ml='2rem'>
              <Typography sx={navStyles.appName}>{t('appName')}</Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar
