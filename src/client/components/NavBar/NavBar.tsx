import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { AdminPanelSettingsOutlined, Language } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  ClickAwayListener,
  Container,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Toolbar,
  Typography,
} from '@mui/material'

import hyLogo from '../../assets/hy_logo.svg'
import { useLoggedInUser } from '../../hooks/useUser'
import styles from '../../styles'

const languages = ['en']
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
  const { t, i18n } = useTranslation()
  const { user, isLoading } = useLoggedInUser()

  const anchorRef = useRef<HTMLButtonElement>(null)
  const [openLanguageSelect, setOpenLanguageSelect] = useState(false)

  const { navStyles } = styles
  const { language } = i18n

  const handleLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage)
    setOpenLanguageSelect(false)
  }

  if (isLoading) return null

  return (
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
              <Typography component='h1' sx={navStyles.appName}>
                {t('appName')}
              </Typography>
            </Box>
          </Box>
          <Box
            component='nav'
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          >
            {pages.map((page) => (
              <Link
                to={page.path}
                key={page.name}
                style={{ textDecoration: 'none' }}
              >
                <Button sx={{ my: 2, display: 'block' }}>
                  {t(`navbar:${page.name}`)}
                </Button>
              </Link>
            ))}
          </Box>
          <Box>
            {user?.isAdmin && (
              <Link to='/admin' style={{ textDecoration: 'none' }}>
                <Button>
                  <AdminPanelSettingsOutlined sx={navStyles.icon} />{' '}
                  {t('admin')}
                </Button>
              </Link>
            )}
            <Button
              ref={anchorRef}
              id='composition-button'
              data-cy='language-select'
              aria-controls={
                openLanguageSelect ? 'composition-menu' : undefined
              }
              aria-expanded={openLanguageSelect ? 'true' : undefined}
              aria-haspopup='true'
              onClick={() => setOpenLanguageSelect(!openLanguageSelect)}
            >
              <Language sx={navStyles.language} /> {language}
            </Button>
            <Popper
              open={openLanguageSelect}
              anchorEl={anchorRef.current}
              role={undefined}
              placement='bottom-start'
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom-start' ? 'left top' : 'left bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener
                      onClickAway={() =>
                        setOpenLanguageSelect(!openLanguageSelect)
                      }
                    >
                      <MenuList
                        autoFocusItem={openLanguageSelect}
                        id='composition-menu'
                        aria-labelledby='composition-button'
                      >
                        {languages.map((l) => (
                          <MenuItem
                            key={l}
                            sx={[
                              navStyles.item,
                              language === l && navStyles.activeItem,
                            ]}
                            onClick={() => {
                              handleLanguageChange(l)
                            }}
                          >
                            {l.toUpperCase()}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar
