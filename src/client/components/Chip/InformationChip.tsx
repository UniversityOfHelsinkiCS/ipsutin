import { useState } from 'react'
import { RecommendationLabel } from '@backend/types'
import { Button } from '@mui/material'

import colors from '../../util/colors'

import ChipWindow from './ChipWindow'

interface InformationChipProps {
  title: string
  label: RecommendationLabel
}

const InformationChip = ({ title, label }: InformationChipProps) => {
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
          backgroundColor: colors[label as keyof typeof colors]?.background,
          marginX: '0.3rem',
          fontWeight: 'normal',
          color: colors[label as keyof typeof colors]?.text,
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
