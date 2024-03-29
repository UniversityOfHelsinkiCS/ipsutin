import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Box, Grid } from '@mui/material'

import { LICENCES_DATA_KEY } from '../../../config'
import RenderSurvey from '../../components/InteractiveForm/RenderSurvey'
import usePersistForm from '../../hooks/usePersistForm'
import useSaveEntryMutation from '../../hooks/useSaveEntryMutation'
import useSurvey from '../../hooks/useSurvey'
import styles from '../../styles'
import { FormValues } from '../../types'

import { useLicenceResultData } from './LicenceResultDataContext'

const Licences = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { survey, isLoading } = useSurvey('licences')

  const { resultData, setResultData } = useLicenceResultData()

  const faculty = searchParams.get('faculty')
  const { formStyles } = styles

  const mutation = useSaveEntryMutation(survey?.id)

  useEffect(() => {
    if (!isLoading) {
      document
        ?.getElementById('licences-main-section')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isLoading])

  const { handleSubmit, control, watch } = useForm({
    mode: 'onBlur',
    shouldUnregister: true,
    defaultValues: resultData,
  })

  usePersistForm({
    value: watch(),
    sessionStorageKey: LICENCES_DATA_KEY,
  })

  if (!survey || isLoading || !faculty) return null

  const onSubmit = (data: FormValues) => {
    const submittedData = { ...data, faculty }

    setResultData(data)
    mutation.mutateAsync(submittedData)

    navigate({
      pathname: './results',
      search: location.search,
    })
  }

  return (
    <Box id='licences-main-section' sx={formStyles.formWrapper}>
      <Grid container>
        <Grid item xl={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <RenderSurvey
              control={control}
              watch={watch}
              questions={survey.Questions}
              surveyName={t('surveyNames:licences')}
              surveyInfo={t('surveyInfos:licences')}
            />
          </form>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Licences
