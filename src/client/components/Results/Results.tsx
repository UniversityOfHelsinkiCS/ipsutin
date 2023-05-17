import { Box, Button, Stack } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SendSummaryEmail from '../SendEmail/SendSummaryEmail'
import { InputProps } from '../../types'
import Contact from '../SendEmail/Contact'
import styles from '../../styles'

const Results = ({ watch }: InputProps) => {
  const { t } = useTranslation()
  const [openContactForm, setOpenContactForm] = useState(false)
  const { formStyles, cardStyles } = styles

  console.log(watch)

  return (
    <Box sx={cardStyles.outerBox}>
      <Box>
        <h2>{t('results:title')}</h2>
      </Box>
      <Box>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae sem
        dolor. Nulla pulvinar volutpat mauris, lobortis porttitor risus placerat
        id. Nunc eu tempus eros. Etiam placerat dignissim tellus a commodo. In
        in tristique dolor. Maecenas vulputate tempor tortor sed consectetur.
        Nam sagittis sit amet ex pulvinar sodales. Nullam vulputate sapien
        nulla, a malesuada ligula posuere id. Nam justo ligula, accumsan quis
        nisl nec, maximus congue est. Aenean imperdiet justo ac lorem porttitor
        consectetur.{' '}
      </Box>
      <Box>
        Nullam gravida nulla arcu, et auctor massa sollicitudin a. Aliquam
        aliquam nisi odio, sit amet interdum tellus tincidunt eu. Donec et dolor
        egestas, gravida magna a, placerat leo. Pellentesque commodo diam ac
        libero malesuada efficitur. Proin sed nisl quis eros aliquet aliquam.
        Nam nec turpis mattis, lobortis ligula eget, maximus justo. Maecenas
        enim nulla, venenatis vitae odio quis, faucibus congue est. Duis quis
        sem nec mauris sagittis condimentum.
      </Box>
      <Box sx={formStyles.stackBoxWrapper}>
        <Stack sx={formStyles.stack} direction="row">
          <SendSummaryEmail />
          <Button
            sx={formStyles.stackButton}
            variant="contained"
            color="primary"
            onClick={
              openContactForm
                ? () => setOpenContactForm(false)
                : () => setOpenContactForm(true)
            }
          >
            {t('contact:submit')}
          </Button>
        </Stack>
      </Box>
      {openContactForm && <Contact />}
    </Box>
  )
}

export default Results
