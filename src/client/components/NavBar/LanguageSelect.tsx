import React from 'react'
import { useTranslation } from 'react-i18next'
import { Language } from '@mui/icons-material'
import {
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material'

import styles from '../../styles'

interface LanguageSelectProps {
  anchorRef: React.RefObject<HTMLButtonElement>
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LANGUAGES = ['en']

const LanguageSelect = ({ anchorRef, open, setOpen }: LanguageSelectProps) => {
  const { i18n } = useTranslation()

  const { navStyles } = styles
  const { language } = i18n

  const handleLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage)
    setOpen(false)
  }

  return (
    <>
      <Button
        ref={anchorRef}
        id='language-menu-button'
        data-cy='language-select'
        aria-controls={open ? 'language-menu' : undefined}
        aria-expanded={open}
        aria-haspopup='true'
        onClick={() => setOpen((prevOpen) => !prevOpen)}
      >
        <Language sx={navStyles.language} /> {language}
      </Button>
      <Popper
        open={open}
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
              <ClickAwayListener onClickAway={() => setOpen(!open)}>
                <MenuList
                  autoFocusItem={open}
                  id='language-menu'
                  aria-labelledby='language-menu-button'
                >
                  {LANGUAGES.map((l) => (
                    <MenuItem
                      key={l}
                      sx={[navStyles.item]}
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
    </>
  )
}

export default LanguageSelect
