import React from 'react'

import { Box, Container } from '@mui/material'

import Markdown from '../Common/Markdown'

import colors from '../../util/colors'

import { Locales, Result } from '../../types'

const ResultElement = ({
  language,
  resultData,
  dimensions,
}: {
  language: keyof Locales
  resultData: Result
  dimensions: string[]
}) => {
  if (!resultData) return null

  return (
    <Container
      style={{
        margin: '2rem 0 2rem 0',
        borderLeft: 'solid',
        borderColor: '#9ca3af',
        borderWidth: '1px',
      }}
    >
      <Box style={{ margin: '2rem 0 2rem 1rem' }}>
        <Markdown>{resultData.isSelected[language]}</Markdown>
      </Box>

      <Box
        style={{
          margin: '2rem 0 2rem 0',
        }}
      >
        {dimensions.map((dimension: string) => {
          const color = colors[dimension] || null
          return (
            <Box
              data-cy={`result-wrapper-${resultData.optionLabel}-${dimension}`}
              key={`${JSON.stringify(resultData)}.${dimension}`}
              style={{
                margin: '1rem',
                padding: '0 2rem 0 2rem ',
                borderLeft: 'solid',
                borderColor: color,
                borderWidth: '6px',
              }}
            >
              <Markdown>{resultData.data[dimension][language]}</Markdown>
            </Box>
          )
        })}
      </Box>
    </Container>
  )
}

export default ResultElement
