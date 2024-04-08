import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { AdminPanelSettingsOutlined } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'

import hyLogo from '../../assets/hy_logo.svg'
import { useLoggedInUser } from '../../hooks/useUser'
import styles from '../../styles'

import LanguageSelect from './LanguageSelect'
import MobileMenu from './MobileMenu'
import ProfileMenu from './ProfileMenu'
import { PAGES } from './util'

const NavBar = () => {
  const { t } = useTranslation()
  const { user, isLoading } = useLoggedInUser()

  const [mobileOpen, setMobileOpen] = useState(false)

  const handleMobileToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const { navStyles } = styles

  if (isLoading) return null

  return (
    <>
      <AppBar elevation={0} position='relative' sx={navStyles.appbar}>
        <Container maxWidth={false}>
          <Toolbar sx={navStyles.toolbar} disableGutters>
            <Box sx={navStyles.navBox}>
              <img
                src={hyLogo}
                alt='University of Helsinki logo'
                loading='lazy'
                width='40 px'
              />
              <Box ml='2rem'>
                <Typography component='p' sx={navStyles.appName}>
                  {t('appName')}
                </Typography>
              </Box>
            </Box>
            <Box
              component='nav'
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}
            >
              {PAGES.map((page) => (
                <Button
                  component={NavLink}
                  to={page.path}
                  key={page.name}
                  sx={navStyles.link}
                >
                  {t(`navbar:${page.name}`)}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
              {user?.isAdmin && (
                <Button component={NavLink} to='/admin' sx={navStyles.link}>
                  <AdminPanelSettingsOutlined sx={navStyles.icon} />{' '}
                  {t('admin')}
                </Button>
              )}
              <ProfileMenu />
            </Box>
            <IconButton
              aria-label={t('navbar:openMobileMenu')}
              edge='start'
              onClick={handleMobileToggle}
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <MobileMenu isOpen={mobileOpen} handleClose={handleMobileToggle}>
        {user?.isAdmin && (
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to='/admin'>
              <ListItemIcon>
                <AdminPanelSettingsOutlined />
              </ListItemIcon>
              <ListItemText primary={t('navbar:admin')} />
            </ListItemButton>
          </ListItem>
        )}
        {PAGES.map((page) => (
          <ListItem key={page.name} disablePadding>
            <ListItemButton
              component={NavLink}
              to={page.path}
              sx={{ justifyContent: 'space-between', px: 4 }}
            >
              <ListItemText primary={t(`navbar:${page.name}`)} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <LanguageSelect />
      </MobileMenu>
    </>
  )
}

export default NavBar
