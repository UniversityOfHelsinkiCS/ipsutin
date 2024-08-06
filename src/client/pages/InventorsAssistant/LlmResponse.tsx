import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Alert, Box, Button, TextField } from '@mui/material'

import Markdown from '../../components/Common/Markdown'

type LlmResponseProps = {
  aiResponse: string
  aiResponseReady: boolean
  setEditedResponse: Dispatch<SetStateAction<string>>
  setEditModeGlobal?: Dispatch<SetStateAction<boolean>>
}

const LlmResponse = ({
  aiResponse,
  aiResponseReady,
  setEditedResponse,
  setEditModeGlobal,
}: LlmResponseProps) => {
  const [editMode, setEditMode] = useState(false)
  const [editedResponse, setEditedResponseLocally] = useState('')

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
        <Alert severity='info'>The Assistant is thinking...</Alert>
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
          {aiResponse && aiResponseReady && (
            <Button
              data-cy='edit-ai-response-button'
              variant='contained'
              sx={{ mt: 2, borderRadius: '0.5rem' }}
              onClick={toggleEditMode}
              color='primary'
              type='button'
            >
              Edit AI Response
            </Button>
          )}
        </>
      )}
    </Box>
  )
}

export default LlmResponse
