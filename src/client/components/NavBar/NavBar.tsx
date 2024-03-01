import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { AdminPanelSettingsOutlined } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  Container,
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

  const { navStyles } = styles

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
              <Typography component='p' sx={navStyles.appName}>
                {t('appName')}
              </Typography>
            </Box>
          </Box>
          <Box
            component='nav'
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar
