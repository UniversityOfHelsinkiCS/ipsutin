import { useState } from 'react'
import { Button } from '@mui/material'

import colors from '../../util/colors'

import ChipWindow from './ChipWindow'

interface InformationChipProps {
  title: string
  label: string
}

const InformationChip: React.FC<InformationChipProps> = ({ title, label }) => {
  const [isChipWindowOpen, setIsChipWindowOpen] = useState(false)

  const toggleChipWindow = () => {
    setIsChipWindowOpen(!isChipWindowOpen)
  }

  return (
    <>
      <Button
        key={title}
        onClick={toggleChipWindow}
        sx={{
          backgroundColor: (colors as any)[label],
          marginX: '0.3rem',
          fontWeight: 'normal',
          color: 'black',
          borderRadius: '0.5rem',
          padding: '10px',
        }}
      >
        {label}
      </Button>
      <ChipWindow open={isChipWindowOpen} close={toggleChipWindow} />
    </>
  )
}

export default InformationChip
