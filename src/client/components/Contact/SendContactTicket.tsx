import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Box, Button, SxProps, TextField, Theme } from '@mui/material'
import { enqueueSnackbar } from 'notistack'

import useLoggedInUser from '../../hooks/useLoggedInUser'
import sendEmail from '../../util/mailing'
import Markdown from '../Common/Markdown'

interface ContactTicketProps {
  title: string
  content: string
  ticketEmail: string
  sx?: SxProps<Theme>
}

const SendContactTicket = ({
  title,
  content,
  ticketEmail,
  sx,
}: ContactTicketProps) => {
  const { t } = useTranslation()
  const [isSent, setIsSent] = useState(false)
  const { user, isLoading } = useLoggedInUser()

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      content: '',
    },
  })

  if (!user || isLoading) return null

  const onSubmit = ({ content }: { content: string }) => {
    const subject = 'Ipsutin contact request'
    const targets = [ticketEmail]
    const text = ` \
    <div> \
    <h3> \
      <strong> \
        Ipsutin Contact Ticket
      </strong> \
    </h3> \
    <p> \
      **********
      <strong>
        ${t('contact:contactTicketSenderEmail')} ${user?.email} \
      </strong> \
      <strong>
        ${t(
          'contact:contactTicketSenderFullname'
        )} ${user?.firstName} ${user?.lastName} \
      </strong> \
    </p> \
    <p> \
      **********
      <strong>
        ${t('contact:contactTicketUserMessage')} \
      </strong> \
      ${content} \
    </p> \
    </div> \
    `

    sendEmail(targets, text, subject)
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
    <Box sx={sx}>
      <Box sx={{ mb: 1 }}>
        <Markdown>{title}</Markdown>
      </Box>
      <Markdown>{content}</Markdown>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='content'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              data-cy='contact-ticket-textfield'
              size='small'
              name='content'
              label={t('contact:contactTicketContentLabel')}
              fullWidth
              multiline
              rows={10}
              margin='dense'
              disabled={isSent}
              error={!!errors?.content}
              helperText={errors?.content && errors.content.message}
            />
          )}
        />

        <Button
          data-cy='send-contact-ticket-button'
          variant='contained'
          sx={{ mt: 2 }}
          disabled={isSent}
          onClick={handleSubmit(onSubmit)}
        >
          {t('contact:contactTicketSend')}
        </Button>
      </form>
    </Box>
  )
}

export default SendContactTicket
