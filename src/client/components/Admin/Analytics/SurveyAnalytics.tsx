import { useTranslation } from 'react-i18next'
import { Box, Container, Typography } from '@mui/material'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Cell, Pie, PieChart } from 'recharts'

import { EntryWithSurvey, SurveyName } from '../../../types'

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
      {survey}: {value}
    </text>
  )
}

const SurveyAnalytics = ({ entries }: { entries: EntryWithSurvey[] }) => {
  const { t } = useTranslation()
  const surveyNames: SurveyName[] = [
    'licences',
    'ideaEvaluation',
    'ipAssessment',
  ]
  const surveyCounts: { [key in SurveyName]: number } = {
    licences: 0,
    ideaEvaluation: 0,
    ipAssessment: 0,
  }

  entries.forEach((entry) => {
    const surveyName = entry.Survey.name
    if (surveyName) {
      surveyCounts[surveyName] = (surveyCounts[surveyName] || 0) + 1
    }
  })

  const data = surveyNames.map((surveyName) => ({
    survey: t(`surveyNames:${surveyName}`),
    count: surveyCounts[surveyName],
  }))

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        data-cy='survey-analytics-title'
        variant='h6'
        sx={{ fontWeight: 'semibold', my: 2 }}
        component='div'
      >
        Survey Analytics
      </Typography>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <PieChart width={960} height={480}>
          <Pie
            data={data}
            dataKey='count'
            nameKey='survey'
            cx='50%'
            cy='50%'
            outerRadius={100}
            fill='#8884d8'
            label={<CustomLabel />}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </Box>
    </Container>
  )
}

export default SurveyAnalytics
