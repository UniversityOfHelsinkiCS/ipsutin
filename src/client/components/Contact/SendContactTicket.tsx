import React, { useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Box, Button, SxProps, TextField, Theme } from '@mui/material'
import { enqueueSnackbar } from 'notistack'

import { useLoggedInUser } from '../../hooks/useUser'
import ContactTicketTemplate from '../../templates/ContactTicketTemplate'
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
  const [isOpen, setIsOpen] = useState(false)
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
    const text = ReactDOMServer.renderToString(
      <ContactTicketTemplate user={user} content={content} />
    )

    sendEmail(targets, text, subject)
      .then(() => {
        setIsSent(true)
        enqueueSnackbar(
          t('contactTicket:pateSuccessMessage', { email: ticketEmail }),
          {
            variant: 'success',
          }
        )
      })
      .catch(() => {
        enqueueSnackbar(t('contactTicket:pateErrorMessage'), {
          variant: 'error',
        })
      })
  }

  return (
    <Box sx={sx}>
      {isOpen ? (
        <>
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
                  placeholder={t('contactTicket:placeholder')}
                  fullWidth
                  multiline
                  rows={10}
                  margin='dense'
                  disabled={isSent}
                  error={!!errors?.content}
                  helperText={errors?.content?.message}
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
              {t('contactTicket:send')}
            </Button>
          </form>
        </>
      ) : (
        <Button
          data-cy='open-contact-ticket'
          onClick={() => setIsOpen(true)}
          variant='contained'
          sx={{ mb: 4 }}
        >
          {title}
        </Button>
      )}
    </Box>
  )
}

export default SendContactTicket
