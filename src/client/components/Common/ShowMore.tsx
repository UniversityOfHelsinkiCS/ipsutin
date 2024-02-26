import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Box, Collapse, IconButton } from '@mui/material'

import Markdown from './Markdown'

const ShowMore = ({
  text,
  expanded = false,
}: {
  text: string
  // eslint-disable-next-line react/require-default-props
  expanded?: boolean
}) => {
  const { t } = useTranslation()
  const [expand, setExpand] = useState(expanded)

  return (
    <>
      <IconButton
        onClick={() => setExpand(!expand)}
        aria-label={t('common:showMore')}
        aria-expanded={expand}
      >
        <HelpOutlineIcon />
        {!expand ? <ExpandMore /> : <ExpandLess />}
      </IconButton>
      <Collapse in={expand} timeout='auto'>
        <Box sx={{ my: 2, pl: 2 }}>
          <Markdown>{text}</Markdown>
        </Box>
      </Collapse>
    </>
  )
}

export default ShowMore
