import React from 'react'
import { Controller } from 'react-hook-form'
import { Box, FormControl, Checkbox, FormControlLabel } from '@mui/material'
import ShowMore from '../Common/ShowMore'
import { MultipleChoiceType, InputProps, Locales } from '../../types'
import styles from '../../styles'

const MultiChoice = ({ control, question, children, language }: InputProps) => {
  const { formStyles } = styles

  return (
    <>
      {(question.optionData.options as MultipleChoiceType[]).map(
        (choice: MultipleChoiceType) => (
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
        )
      )}

      {children}
    </>
  )
}

export default MultiChoice
