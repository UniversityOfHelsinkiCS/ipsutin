import React from 'react'
import { Controller } from 'react-hook-form'
import { RadioGroup, FormControlLabel, Radio, Box } from '@mui/material'

import { InputProps, Locales, SingleChoiceType } from '../../types'

const SingleChoice = ({
  control,
  watch,
  question,
  children,
  language,
}: InputProps) => {
  if (question.visibility?.options) {
    const [...options] = question.visibility.options

    const parent = watch(question.parentId.toString())

    if (!options.includes(parent)) return null
  }

  return (
    <>
      <Controller
        control={control}
        name={question.id.toString()}
        defaultValue=""
        render={({ field }) => (
          <Box justifyContent="center">
            <RadioGroup {...field} row>
              {question.optionData.options.map(
                (singleOption: SingleChoiceType) => (
                  <FormControlLabel
                    data-cy={`choice-select-${singleOption.id}`}
                    key={singleOption.id as string}
                    value={singleOption.id}
                    label={singleOption.label[language as keyof Locales]}
                    control={<Radio />}
                  />
                )
              )}
            </RadioGroup>
          </Box>
        )}
      />

      {children}
    </>
  )
}

export default SingleChoice
