/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material'
import styles from '../../styles'

const ticketEmail = 'testi@testi.fi'

const SendContactTicket = () => {
  const { t } = useTranslation()
  const [isSent, setIsSent] = useState(false)

  const { formStyles, common } = styles

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      content: '',
    },
  })

  const onSubmit = async ({ content }: { content: string }) => {
    const targets = [ticketEmail]
    const text = `

    ${t('contact:contactTicketUserMessage')}
    ============================

    ${content}

    `
    console.log(targets, text)
    setIsSent(true)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        data-cy="contact-ticket-textfield"
        size="small"
        name="content"
        label={t('contact:contactTicketContentLabel')}
        fullWidth
        multiline
        rows={20}
        margin="dense"
        {...register('content')}
        error={errors.content ? true : false} // eslint-disable-line no-unneeded-ternary
      />
      {errors.content && (
        <Typography variant="body2">{errors.content?.message}</Typography>
      )}
      <Box sx={formStyles.stackBoxWrapper}>
        {!isSent ? (
          <Stack sx={formStyles.stack} direction="row">
            <Button
              data-cy="send-contact-ticket-button"
              sx={formStyles.stackButton}
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              {t('contact:contactTicketSend')}
            </Button>
          </Stack>
        ) : (
          <Alert
            data-cy="contact-ticket-success-alert"
            sx={common.alertStyle}
            severity="success"
          >
            {t('contact:sendSuccess')}
          </Alert>
        )}
      </Box>
    </form>
  )
}

export default SendContactTicket
