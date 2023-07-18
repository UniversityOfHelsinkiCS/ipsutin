import React from 'react'
import { Controller } from 'react-hook-form'
import { Locales } from '@backend/types'
import { Box, Checkbox, FormControl, FormControlLabel } from '@mui/material'

import styles from '../../styles'
import { InputProps } from '../../types'
import ShowMore from '../Common/ShowMore'

const MultiChoice = ({ control, question, children, language }: InputProps) => {
  const { formStyles } = styles

  return (
    <>
      {question.optionData.options.map((choice) => (
        <Controller
          key={choice.id}
          name={`${question.id}.${choice.id}`}
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControl sx={formStyles.formControl}>
              <Box sx={formStyles.choiceBox}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      value={choice.id}
                      checked={field.value}
                    />
                  }
                  data-cy={`choice-select-${choice.id}`}
                  label={choice.label[language as keyof Locales]}
                />
                {choice.data ? (
                  <ShowMore text={choice.data[language as keyof Locales]} />
                ) : null}
              </Box>
            </FormControl>
          )}
        />
      ))}

      {children}
    </>
  )
}

export default MultiChoice
