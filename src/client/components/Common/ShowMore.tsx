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
      <IconButton sx={{ ml: 2 }} onClick={() => setExpand(!expand)}>
        <HelpOutlineIcon />
        {!expand ? <ExpandMore /> : <ExpandLess />}
      </IconButton>
      <Collapse sx={{ mt: 2 }} in={expand} timeout="auto">
        <Markdown>{text}</Markdown>
      </Collapse>
    </>
  )
}

export default ShowMore
