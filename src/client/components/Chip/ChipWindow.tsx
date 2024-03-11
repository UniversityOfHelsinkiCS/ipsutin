// eslint-disable-next-line import/no-extraneous-dependencies
import * as React from 'react'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'

interface ChipWindowProps {
  open: boolean
  close: () => void
}

const ChipWindow: React.FC<ChipWindowProps> = ({ open, close }) => {
  const element = document.getElementById('important-box')
  return (
    <Popover
      anchorEl={element}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      onClose={close}
      sx={{
        maxWidth: '1200px',
        maxHeight: '500px',
      }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: '10px',
            border: '1px solid black',
          },
        },
      }}
    >
      <Typography
        sx={{
          padding: '20px',
        }}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industrys standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Typography>
    </Popover>
  )
}
export default ChipWindow
