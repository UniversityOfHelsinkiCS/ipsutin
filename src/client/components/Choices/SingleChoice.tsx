import React from 'react'
import { Controller } from 'react-hook-form'
import { Locales } from '@backend/types'
import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material'

import { InputProps } from '../../types'

const SingleChoice = ({
  control,
  question,
  children,
  language,
}: InputProps) => {
  if (!question) return null

  return (
    <>
      <Controller
        control={control}
        name={question.id.toString()}
        defaultValue=''
        render={({ field }) => (
          <Box justifyContent='center'>
            <RadioGroup {...field} row>
              {question.optionData.options.map((singleOption) => (
                <FormControlLabel
                  id={`choice-select-${singleOption.id}`}
                  key={singleOption.id}
                  value={singleOption.id}
                  label={singleOption.label[language as keyof Locales]}
                  control={<Radio />}
                />
              ))}
            </RadioGroup>
          </Box>
        )}
      />

      {children}
    </>
  )
}

export default SingleChoice
