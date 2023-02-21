import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import styles from './styles'

const classes = styles.cardStyles

const Contact = () => {
  const { t } = useTranslation()
  const [contactMethod, setContactMethod] = useState('email')

  return (
    <Box sx={{ m: 2, maxWidth: 1080, border: 1, borderColor: 'grey.300' }}>
      <Container sx={{ mt: 2 }}>
        <Typography variant="h5" sx={classes.heading} component="div">
          {t('contact:title')}
        </Typography>
        <Typography sx={classes.content} variant="body2">
          {t('contact:contactMessage')}
        </Typography>
        <Box sx={classes.card}>
          <FormControl>
            <FormLabel id="contact-method-buttons">
              {t('contact:contactMethodLabel')}
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="contact-method-buttons"
              name="controlled-contact-method-buttons"
              value={contactMethod}
              onChange={(event) => setContactMethod(event.target.value)}
            >
              <FormControlLabel
                value="email"
                control={<Radio />}
                label={t('contact:contactMethodEmail')}
              />
              <FormControlLabel
                value="consultation"
                control={<Radio />}
                label={t('contact:contactMethodConsultation')}
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Container>
    </Box>
  )
}

export default Contact