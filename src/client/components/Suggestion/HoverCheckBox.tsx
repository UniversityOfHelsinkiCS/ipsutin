import React, { useState } from 'react'
import { Alert, Box, Checkbox, FormControlLabel } from '@mui/material'

import Markdown from '../Common/Markdown'

interface HoverCheckboxProps {
  checkBoxChecked: boolean
  setCheckBoxChecked: (checked: boolean) => void
  isSent: boolean
  label: string
  alertLabel: string
}

const HoverCheckbox: React.FC<HoverCheckboxProps> = ({
  checkBoxChecked,
  setCheckBoxChecked,
  isSent,
  label,
  alertLabel,
}) => {
  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }

  return (
    <Box position='relative' display='inline-block'>
      {hovered && (
        <Box
          position='absolute'
          top={-10}
          left={25}
          zIndex={10}
          maxWidth='500px'
          width='max-content'
        >
          <Alert
            severity='info'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Markdown>{alertLabel}</Markdown>
          </Alert>
        </Box>
      )}

      <FormControlLabel
        control={
          <Checkbox
            checked={checkBoxChecked}
            onChange={(e) => setCheckBoxChecked(e.target.checked)}
            disabled={isSent}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        }
        label={label}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </Box>
  )
}

export default HoverCheckbox
