import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button } from '@mui/material'

const LANGUAGES = ['en', 'sv', 'fi']

const LanguageSelect = () => {
  const { i18n } = useTranslation()

  const { language } = i18n
  const languages = LANGUAGES.filter((lang) => lang !== language)

  const handleLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage)
  }

  return (
    <Box data-cy='language-select'>
      {languages.map((lang) => (
        <Button
          onClick={() => handleLanguageChange(lang)}
          key={lang}
          data-cy={`select-language-${lang}`}
        >
          {lang}
        </Button>
      ))}
    </Box>
  )
}

export default LanguageSelect
