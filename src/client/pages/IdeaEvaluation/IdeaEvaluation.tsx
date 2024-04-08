import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'

import { IDEA_EVALUATION_DATA_KEY } from '../../../config'
import RenderSurvey from '../../components/InteractiveForm/RenderSurvey'
import { useResultData } from '../../components/InteractiveForm/ResultDataContext'
import usePersistForm from '../../hooks/usePersistForm'
import useSaveEntryMutation from '../../hooks/useSaveEntryMutation'
import useSurvey from '../../hooks/useSurvey'
import { FormValues } from '../../types'

const IdeaEvaluation = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { survey, isLoading: surveyIsLoading } = useSurvey('ideaEvaluation')

  const { resultData, setResultData } = useResultData()

  const mutation = useSaveEntryMutation(survey?.id)

  const { handleSubmit, control, watch } = useForm({
    mode: 'onBlur',
    shouldUnregister: true,
    defaultValues: resultData,
  })

  usePersistForm({
    value: watch(),
    sessionStorageKey: IDEA_EVALUATION_DATA_KEY,
  })

  if (!survey || surveyIsLoading) return null

  const onSubmit = (data: FormValues) => {
    setResultData(data)
    mutation.mutateAsync(data)

    navigate({
      pathname: './results',
    })
  }

  return (
    <Box component='section'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RenderSurvey
          control={control}
          watch={watch}
          questions={survey.Questions}
          surveyName={t('surveyNames:ideaEvaluation')}
          surveyInfo={t('surveyInfos:ideaEvaluation')}
        />
      </form>
    </Box>
  )
}

export default IdeaEvaluation
