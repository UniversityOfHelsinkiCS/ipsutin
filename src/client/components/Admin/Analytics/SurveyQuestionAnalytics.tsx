/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTranslation } from 'react-i18next'
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

const SurveyQuestionAnalytics = () => (
  <ResponsiveContainer width='100%' height='100%'>
    <BarChart
      width={500}
      height={300}
      data={[]}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey='pv' fill='#8884d8' minPointSize={5} />
      <Bar dataKey='uv' fill='#82ca9d' minPointSize={10} />
    </BarChart>
  </ResponsiveContainer>
)

export default SurveyQuestionAnalytics
