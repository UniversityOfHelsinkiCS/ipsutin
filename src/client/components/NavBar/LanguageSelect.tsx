import React from 'react'
import { useTranslation } from 'react-i18next'
import CheckIcon from '@mui/icons-material/Check'
import { ListItem, ListItemButton, ListSubheader } from '@mui/material'

import { LANGUAGES } from './util'

const LanguageSelect = () => {
  const { t, i18n } = useTranslation()
  const { language } = i18n

  const handleLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage)
  }

  return (
    <>
      <ListSubheader disableSticky>
        {t('navbar:languageSubHeader')}
      </ListSubheader>
      {LANGUAGES.map((lang) => (
        <ListItem key={lang.code} disablePadding>
          <ListItemButton
            aria-current={lang.code === language}
            onClick={() => handleLanguageChange(lang.code)}
            data-cy={`select-language-${lang.name.toLowerCase()}`}
            sx={{ justifyContent: 'space-between', px: 4 }}
          >
            {lang.name}{' '}
            {lang.code === language && <CheckIcon color='primary' />}
          </ListItemButton>
        </ListItem>
      ))}
    </>
  )
}

export default LanguageSelect
