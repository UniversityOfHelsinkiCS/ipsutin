/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { enqueueSnackbar } from 'notistack'

import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material'

import apiClient from '../../util/apiClient'

import styles from '../../styles'

const SendContactTicket = ({ ticketEmail }: { ticketEmail: string }) => {
  const { t } = useTranslation()
  const [isSent, setIsSent] = useState(false)

  console.log(ticketEmail)

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

  const sendResultsToEmail = async (targets: string[], text: string) => {
    apiClient.post('/summary', {
      targets,
      text,
      subject: 'Ipsutin contact',
    })
  }

  const onSubmit = async ({ content }: { content: string }) => {
    const targets = [ticketEmail]
    const text = content

    sendResultsToEmail(targets, text)
      .then(() => {
        setIsSent(true)
        enqueueSnackbar(
          t('contact:pateSuccessMessage', { email: ticketEmail }),
          {
            variant: 'success',
          }
        )
      })
      .catch(() => {
        enqueueSnackbar(t('contact:pateErrorMessage'), { variant: 'error' })
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        data-cy='contact-ticket-textfield'
        size='small'
        name='content'
        label={t('contact:contactTicketContentLabel')}
        fullWidth
        multiline
        rows={10}
        margin='dense'
        {...register('content')}
        error={errors.content ? true : false} // eslint-disable-line no-unneeded-ternary
      />
      {errors.content && (
        <Typography variant='body2'>{errors.content?.message}</Typography>
      )}
      <Box sx={formStyles.stackBoxWrapper}>
        <Button
          data-cy='send-contact-ticket-button'
          sx={formStyles.stackButton}
          variant='contained'
          disabled={isSent}
          onClick={handleSubmit(onSubmit)}
        >
          {t('contact:contactTicketSend')}
        </Button>
      </Box>
    </form>
  )
}

export default SendContactTicket
