import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'

import { LICENCES_DATA_KEY } from '../../../config'
import RenderSurvey from '../../components/InteractiveForm/RenderSurvey'
import { useResultData } from '../../components/InteractiveForm/ResultDataContext'
import usePersistForm from '../../hooks/usePersistForm'
import useSaveEntryMutation from '../../hooks/useSaveEntryMutation'
import useSurvey from '../../hooks/useSurvey'
import { productStyles } from '../../styles'
import { FormValues } from '../../types'

const Licences = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { survey, isLoading } = useSurvey('licences')

  const { resultData, setResultData } = useResultData()

  const mutation = useSaveEntryMutation(survey?.id)

  const { handleSubmit, control, watch } = useForm({
    mode: 'onBlur',
    shouldUnregister: true,
    defaultValues: resultData,
  })

  usePersistForm({
    value: watch(),
    sessionStorageKey: LICENCES_DATA_KEY,
  })

  if (!survey || isLoading) return null

  const onSubmit = (data: FormValues) => {
    setResultData(data)
    mutation.mutateAsync(data)

    navigate({
      pathname: './results',
      search: location.search,
    })
  }

  return (
    <Box component='section' sx={productStyles.productContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RenderSurvey
          control={control}
          watch={watch}
          questions={survey.Questions}
          surveyName={t('surveyNames:licences')}
          surveyInfo={t('surveyInfos:licences')}
        />
      </form>
    </Box>
  )
}

export default Licences
