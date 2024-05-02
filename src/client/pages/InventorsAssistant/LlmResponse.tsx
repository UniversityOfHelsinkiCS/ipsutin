import { useEffect, useState } from 'react'
import { Alert, Box, Button, TextField } from '@mui/material'

import Markdown from '../../components/Common/Markdown'

type LlmResponseProps = {
  aiResponse: string
}

const LlmResponse = ({ aiResponse }: LlmResponseProps) => {
  const [editMode, setEditMode] = useState(false)
  const [editedResponse, setEditedResponse] = useState(aiResponse)

  useEffect(() => {
    setEditedResponse(aiResponse)
  }, [aiResponse])

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const handleResponseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedResponse(event.target.value)
  }

  const handleSave = () => {
    toggleEditMode()
  }

  if (editMode)
    return (
      <Box component='section' sx={{ mt: 4 }}>
        <>
          <TextField
            fullWidth
            multiline
            minRows={5}
            value={editedResponse}
            onChange={handleResponseChange}
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
        </>
      </Box>
    )
  return (
    <Alert
      severity={aiResponse ? 'success' : 'info'}
      sx={{ my: 4, p: 4, width: '100%' }}
    >
      <>
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
      </>
    </Alert>
  )
}

export default LlmResponse
