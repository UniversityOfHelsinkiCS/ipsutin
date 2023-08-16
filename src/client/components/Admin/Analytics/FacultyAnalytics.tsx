import { useTranslation } from 'react-i18next'
import { CircularProgress, Container, Paper, Typography } from '@mui/material'
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { useEntries } from '../../../hooks/useEntry'
import useFaculties from '../../../hooks/useFaculty'
import styles from '../../../styles'

const { resultStyles } = styles

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
    <Container sx={{ mt: 4 }}>
      <Typography
        data-cy='faculty-analytics-title'
        variant='h5'
        sx={resultStyles.heading}
        component='div'
      >
        Faculty Analytics
      </Typography>
      <BarChart
        width={1000}
        height={500}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='code' />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey='count' barSize={20} fill='#8884d8' />
      </BarChart>
    </Container>
  )
}

export default FacultyAnalytics
