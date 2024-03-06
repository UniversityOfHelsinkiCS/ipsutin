/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

import { useSurveyCounts } from '../../../hooks/useSurvey'
import LoadingProgress from '../../Common/LoadingProgress'

const COLORS = ['#8884d8', '#82ca9d', '#ffc658']

const CustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  index,
  value,
  survey,
}: any) => {
  const { t } = useTranslation()
  const RADIAN = Math.PI / 180
  const radius = 25 + innerRadius + (outerRadius - innerRadius)
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill={COLORS[index % COLORS.length]}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
    >
      {t(`surveyNames:${survey}`)}: {value}
    </text>
  )
}

const SurveyAnalytics = () => {
  const { surveyCounts, isLoading } = useSurveyCounts()

  if (!surveyCounts || isLoading) return <LoadingProgress />

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
          data-cy='survey-analytics-title'
          variant='h6'
          sx={{ fontWeight: 'bold' }}
          component='div'
        >
          Survey Analytics
        </Typography>
      </Box>
      <ResponsiveContainer width='100%' height={480}>
        <PieChart>
          <Pie
            data={surveyCounts}
            dataKey='count'
            nameKey='survey'
            cx='50%'
            cy='50%'
            outerRadius={100}
            fill='#8884d8'
            label={<CustomLabel />}
          >
            {surveyCounts.map((entry, index) => (
              <Cell
                key={`cell-${entry}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default SurveyAnalytics
