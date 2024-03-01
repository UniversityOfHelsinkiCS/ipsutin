import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import {
  AdminPanelSettingsOutlined,
  Logout,
  PersonAdd,
  Settings,
} from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Skeleton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'

import hyLogo from '../../assets/hy_logo.svg'
import { useSelectedFaculty } from '../../hooks/useFaculty'
import { useLoggedInUser } from '../../hooks/useUser'
import styles from '../../styles'

import LanguageSelect from './LanguageSelect'
import MobileMenu from './MobileMenu'

const PAGES = [
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

function stringToColor(string: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

const ProfileMenu = () => {
  const { t } = useTranslation()
  const { user, isLoading } = useLoggedInUser()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  if (isLoading) return <Skeleton variant='circular' width={40} height={40} />

  return (
    <>
      <Tooltip title={t('navbar:settings')}>
        <IconButton
          onClick={handleClick}
          size='small'
          sx={{ ml: 2 }}
          aria-controls={open ? 'profile-settings' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              cursor: 'pointer',
              bgcolor: stringToColor(user?.username || ''),
            }}
          >
            {user?.firstName[0]}
            {user?.lastName[0]}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id='profile-settings'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <LanguageSelect />
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize='small' />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

const NavBar = () => {
  const { t } = useTranslation()
  const { user, isLoading } = useLoggedInUser()
  const faculty = useSelectedFaculty()

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
                  to={`${page.path}?faculty=${faculty}`}
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
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to='/admin'
            sx={{ textAlign: 'left', textTransform: 'uppercase' }}
          >
            <ListItemIcon>
              <AdminPanelSettingsOutlined />
            </ListItemIcon>
            <ListItemText primary={t('navbar:admin')} />
          </ListItemButton>
        </ListItem>
        {PAGES.map((page) => (
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
      </MobileMenu>
    </>
  )
}

export default NavBar
