import { useState } from 'react'
import { Alert, Box, Button, TextField } from '@mui/material'

import Markdown from '../../components/Common/Markdown'

type InventorResponseProps = {
  aiResponse: string
}

const InventorResponse = ({ aiResponse }: InventorResponseProps) => {
  const [editMode, setEditMode] = useState(false)
  const [editedResponse, setEditedResponse] = useState(aiResponse)

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
        <Button
          onClick={toggleEditMode}
          variant='outlined'
          color='primary'
          sx={{ mt: 2 }}
        >
          Edit
        </Button>
      </>
    </Alert>
  )
}

export default InventorResponse
