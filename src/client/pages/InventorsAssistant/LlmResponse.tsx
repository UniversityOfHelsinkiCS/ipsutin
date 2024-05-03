import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Alert, Box, Button, TextField } from '@mui/material'

import Markdown from '../../components/Common/Markdown'

type LlmResponseProps = {
  aiResponse: string
  setEditedResponse: Dispatch<SetStateAction<string>>
  setEditModeGlobal: Dispatch<SetStateAction<boolean>>
}

const LlmResponse = ({
  aiResponse,
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
    setEditModeGlobal(!editMode)
  }

  const handleSave = () => {
    toggleEditMode()
    setEditedResponse(editedResponse)
  }

  return (
    <Box sx={{ mt: 4 }}>
      {editMode ? (
        <div>
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
            variant='outlined'
            color='primary'
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        </div>
      ) : (
        <Alert
          severity={aiResponse ? 'success' : 'info'}
          sx={{ my: 4, p: 4, width: '100%' }}
        >
          <Markdown>
            {aiResponse || 'Grunching response for you, please wait...'}
          </Markdown>
          {aiResponse && aiResponse.length > 0 && (
            <Button
              onClick={toggleEditMode}
              variant='outlined'
              color='primary'
              sx={{ mt: 2 }}
            >
              Edit
            </Button>
          )}
        </Alert>
      )}
    </Box>
  )
}

export default LlmResponse
