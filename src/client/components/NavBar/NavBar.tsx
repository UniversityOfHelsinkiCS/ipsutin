import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { AdminPanelSettingsOutlined } from '@mui/icons-material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'

import hyLogo from '../../assets/hy_logo.svg'
import { useSelectedFaculty } from '../../hooks/useFaculty'
import { useLoggedInUser } from '../../hooks/useUser'
import styles from '../../styles'

import LanguageSelect from './LanguageSelect'

const pages = [
  {
    name: 'home',
    path: '/',
  },
  {
    name: 'about',
    path: '/about',
  },
  {
    name: 'contact',
    path: '/contact',
  },
]

const NavBar = () => {
  const { t } = useTranslation()
  const { user, isLoading } = useLoggedInUser()
  const faculty = useSelectedFaculty()

  const languageSelectRef = useRef<HTMLButtonElement>(null)
  const [openLanguageSelect, setOpenLanguageSelect] = useState(false)
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
              {pages.map((page) => (
                <Button
                  component={NavLink}
                  to={`${page.path}?faculty=${faculty}`}
                  key={page.name}
                  sx={navStyles.link}
                >
                  {t(`navbar:${page.name}`)}
                </Button>
              ))}
            </Box>
            <Box>
              {user?.isAdmin && (
                <Button component={NavLink} to='/admin' sx={navStyles.link}>
                  <AdminPanelSettingsOutlined sx={navStyles.icon} /> {t('admin')}
                </Button>
              )}
              <LanguageSelect
                anchorRef={languageSelectRef}
                open={openLanguageSelect}
                setOpen={setOpenLanguageSelect}
              />
              <IconButton
                aria-label="open menu"
                edge="start"
                onClick={handleMobileToggle}
                sx={{display: { xs: 'block', sm: 'none' }}}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          anchor='right'
          open={mobileOpen}
          onClose={handleMobileToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '60%' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              ...(theme => theme.mixins.toolbar),
              px: 1,
              height: '100px'
            }}
          >
            <IconButton onClick={handleMobileToggle}>
              <ChevronRightIcon />
            </IconButton>
          </Box>
          <Divider />
          <List onClick={handleMobileToggle} sx={{ textAlign: 'center' }}>
          {pages.map((page) => (
            <ListItem key={page.name} disablePadding>
              <ListItemButton 
                component={NavLink} 
                to={`${page.path}?faculty=${faculty}`}
                sx={{ textAlign: 'left', textTransform: 'uppercase' }}
              >
                <ListItemText primary={page.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        </Drawer>
      </Box>
    </>

  )
}

export default NavBar
