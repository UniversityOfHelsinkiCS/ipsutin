import React from 'react'
import { Controller } from 'react-hook-form'
import { RadioGroup, FormControlLabel, Radio, Box } from '@mui/material'

import { Locales } from '@backend/types'

import { InputProps } from '../../types'

const SingleChoice = ({
  control,
  question,
  children,
  language,
}: InputProps) => (
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
                key={singleOption.id as string}
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

export default SingleChoice
