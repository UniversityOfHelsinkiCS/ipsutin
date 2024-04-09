/* eslint-disable jsx-a11y/aria-role */
import React from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import { Assistant, Person } from '@mui/icons-material'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'

import { Message, Role } from '../../types'

export const Response = ({
  role,
  content,
}: {
  role: Role
  content: string
}) => {
  const isUser = role === 'user'

  return (
    <Box mb={2} overflow='auto'>
      <Box display='inline-block'>
        <Paper variant='outlined'>
          <Box display='flex'>
            {isUser ? (
              <Person sx={{ mx: 3, my: 4 }} />
            ) : (
              <Assistant sx={{ mx: 3, my: 4 }} />
            )}
            <Box pr={7} py={2}>
              <ReactMarkdown>{content}</ReactMarkdown>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

const Conversation = ({
  messages,
  completion,
  handleStop = () => {},
}: {
  messages: Message[]
  completion: string
  handleStop?: () => void
}) => {
  const { t } = useTranslation()

  if (messages.length === 0 && !completion) return null

  return (
    <Box>
      <Box mb={1}>
        <Typography variant='h6'>{t('chat:conversation')}</Typography>
      </Box>
      {messages.map(({ role, content }) => (
        <Response key={content} role={role} content={content} />
      ))}
      {completion && (
        <>
          <Stack direction='row' spacing={2} sx={{ marginBottom: '20px' }}>
            <div className='loader' />
          </Stack>
          <Response role='assistant' content={completion} />
          <Button
            onClick={handleStop}
            variant='contained'
            sx={{ margin: '30px', backgroundColor: 'grey' }}
          >
            Stop
          </Button>
        </>
      )}
    </Box>
  )
}

export default Conversation
