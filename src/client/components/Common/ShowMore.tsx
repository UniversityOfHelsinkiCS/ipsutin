import React, { useState } from 'react'
import { IconButton, Collapse } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Markdown from './Markdown'

const ShowMore = ({
  text,
  expanded = false,
}: {
  text: string
  // eslint-disable-next-line react/require-default-props
  expanded?: boolean
}) => {
  const [expand, setExpand] = useState(expanded)

  return (
    <>
      <IconButton onClick={() => setExpand(!expand)}>
        <HelpOutlineIcon />
        {!expand ? <ExpandMore /> : <ExpandLess />}
      </IconButton>
      <Collapse in={expand} timeout="auto" unmountOnExit>
        <Markdown>{text}</Markdown>
      </Collapse>
    </>
  )
}

export default ShowMore
