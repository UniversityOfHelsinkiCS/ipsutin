import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Alert, Box, Button, TextField } from '@mui/material'
import { t } from 'i18next'

import Markdown from '../../components/Common/Markdown'

type LlmResponseProps = {
  current: boolean
  aiResponse: string
  aiResponseReady: boolean
  setEditedResponse: Dispatch<SetStateAction<string>>
  setEditModeGlobal?: Dispatch<SetStateAction<boolean>>
}

const LlmResponse = ({
  current,
  aiResponse,
  aiResponseReady,
  setEditedResponse,
  setEditModeGlobal,
}: LlmResponseProps) => {
  const [editMode, setEditMode] = useState(false)
  const [editedResponse, setEditedResponseLocally] = useState('')
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!editMode) {
      setEditedResponseLocally(aiResponse)
    }
  }, [aiResponse, editMode])

  const toggleEditMode = () => {
    setEditMode(!editMode)

    if (setEditModeGlobal) {
      setEditModeGlobal(!editMode)
    }
  }

  const handleSave = () => {
    toggleEditMode()
    setEditedResponse(editedResponse)
  }

  if (!aiResponse) {
    return (
      <Box sx={{ my: 4 }}>
        <Alert severity='info'>{t('inventorsAssistant:AiThinking')}</Alert>
      </Box>
    )
  }

  return (
    <Box sx={{ my: 4 }}>
      {editMode ? (
        <>
          <TextField
            fullWidth
            multiline
            minRows={5}
            value={editedResponse}
            onChange={(event) => setEditedResponseLocally(event.target.value)}
            sx={{ border: '4px solid green' }}
          />
          <Button
            onClick={handleSave}
            color='primary'
            variant='contained'
            sx={{ mt: 1, borderRadius: '0.5rem' }}
            type='button'
          >
            Save
          </Button>
        </>
      ) : (
        <>
          <Alert severity='success' sx={{ py: 4, px: 2, width: '100%' }}>
            <Markdown>{aiResponse}</Markdown>
          </Alert>
          {aiResponse && aiResponseReady && current && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mt: 2,
                position: 'relative',
                minHeight: '56px',
              }}
            >
              <Button
                data-cy='edit-ai-response-button'
                variant='contained'
                sx={{ borderRadius: '0.5rem', mr: 2, whiteSpace: 'nowrap' }}
                onClick={toggleEditMode}
                color='primary'
                type='button'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {t('inventorsAssistant:EditButton')}
              </Button>
              <Alert
                severity='info'
                sx={{
                  py: 1,
                  px: 2,
                  width: 'flex',
                  visibility: isHovered ? 'visible' : 'hidden',
                }}
              >
                <Markdown>{t('inventorsAssistant:EditInfo')}</Markdown>
              </Alert>
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

export default LlmResponse
