import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { useEntries } from '../../../hooks/useEntry'
import useFaculties from '../../../hooks/useFaculty'
import styles from '../../../styles'

const { resultStyles } = styles

const FacultyAnalytics = () => {
  const { entries, isLoading: isEntriesLoading } = useEntries()
  const { faculties, isLoading: isFacultiesLoading } = useFaculties()

  if (isEntriesLoading || isFacultiesLoading) {
    return <CircularProgress />
  }

  const facultyCounts: { [key: string]: number } = {}

  // Count the number of entries for each faculty
  entries.forEach((entry) => {
    const { faculty } = entry.data
    if (faculty) {
      facultyCounts[faculty] = (facultyCounts[faculty] || 0) + 1
    }
  })

  const data = faculties.map((faculty) => ({
    faculty: faculty.name,
    count: facultyCounts[faculty.code] || 0,
    code: faculty.code,
  }))

  return (
    <Box sx={{ mx: 2 }}>
      <Box sx={{ mt: 4, mx: 4 }}>
        <Typography
          data-cy='faculty-analytics-title'
          variant='h5'
          sx={resultStyles.heading}
          component='div'
        >
          Faculty Analytics
        </Typography>
        <BarChart width={600} height={400} data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='faculty' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='count' fill='#8884d8'>
            {data.map((entry) => (
              <Cell key={`cell-${entry}`} fill='#8884d8' />
            ))}
            <LabelList dataKey='code' position='top' />
          </Bar>
        </BarChart>
      </Box>
    </Box>
  )
}

export default FacultyAnalytics
