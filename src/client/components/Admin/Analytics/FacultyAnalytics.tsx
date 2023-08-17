import { useTranslation } from 'react-i18next'
import { Faculty } from '@backend/types'
import { Box, Paper, Typography } from '@mui/material'
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { EntryWithSurvey } from '../../../types'

interface TooltipProps {
  active?: boolean
  payload?: any
  label?: string
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  const { i18n } = useTranslation()
  const { language } = i18n

  if (active && payload && payload.length) {
    const [{ payload: data }] = payload

    return (
      <Paper sx={{ p: 1, opacity: '70%' }}>
        <Typography
          variant='h6'
          sx={{ fontWeight: 'semibold' }}
        >{`${label} : ${payload[0].value}`}</Typography>
        <Typography variant='body2' sx={{ fontWeight: 200 }}>
          {data?.faculty[language]}
        </Typography>
      </Paper>
    )
  }

  return null
}

const FacultyAnalytics = ({
  entries,
  faculties,
}: {
  entries: EntryWithSurvey[]
  faculties: Faculty[]
}) => {
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
    <Box sx={{ mx: 2, mt: 4 }}>
      <Box
        sx={{
          px: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          data-cy='faculty-analytics-title'
          variant='h6'
          sx={{ fontWeight: 'bold' }}
          component='div'
        >
          Faculty Analytics
        </Typography>
      </Box>
      <ResponsiveContainer width='100%' height={480}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='code' />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey='count' barSize={20} fill='#8884d8' />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default FacultyAnalytics
