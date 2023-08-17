import React from 'react'
import { Grid } from '@mui/material'

import { useEntries } from '../../../hooks/useEntry'
import useFaculties from '../../../hooks/useFaculty'
import useUserCounts from '../../../hooks/useUserCounts'
import LoadingProgress from '../../Common/LoadingProgress'

import FacultyAnalytics from './FacultyAnalytics'
import SurveyAnalytics from './SurveyAnalytics'
import UserCountAnalytics from './UserCountAnalytics'

const RenderAnalytics = () => {
  const { userCounts, isLoading: isUserCountLoading } = useUserCounts()
  const { entries, isLoading: isEntriesLoading } = useEntries()
  const { faculties, isLoading: isFacultiesLoading } = useFaculties()

  if (isUserCountLoading || isEntriesLoading || isFacultiesLoading) {
    return <LoadingProgress />
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} xl={8}>
        <FacultyAnalytics entries={entries} faculties={faculties} />
      </Grid>
      <Grid item xs={12} xl={8}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <SurveyAnalytics entries={entries} />
          </Grid>
          <Grid item xs={6}>
            <UserCountAnalytics userCounts={userCounts} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RenderAnalytics
