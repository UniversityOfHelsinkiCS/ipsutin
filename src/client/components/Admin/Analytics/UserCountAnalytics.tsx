import React from 'react'
import { UserCount } from '@backend/types'
import { Box, Typography } from '@mui/material'
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from 'recharts'

import useUserCounts from '../../../hooks/useUserCounts'
import LoadingProgress from '../../Common/LoadingProgress'

const CustomLabel = ({
  viewBox,
  userCounts,
}: {
  viewBox?: any
  userCounts: UserCount[]
}) => {
  const { cx, cy } = viewBox
  const totalUsers = userCounts[0].value + userCounts[1].value
  return (
    <g>
      <text x={cx} y={cy} dy={-30} textAnchor='middle' fill='#000'>
        <tspan fill='#82ca9d' fontSize='32'>
          {userCounts[0].value}
        </tspan>
      </text>
      <text x={cx} y={cy} dy={0} textAnchor='middle' fill='#000'>
        <tspan fontSize='16'>Today</tspan>
      </text>
      <text x={cx} y={cy} dy={40} textAnchor='middle' fill='#CCC'>
        <tspan fontSize='16'>{`${totalUsers} alltime`}</tspan>
      </text>
    </g>
  )
}

const UserCountAnalytics = () => {
  const { userCounts, isLoading } = useUserCounts()

  if (!userCounts || isLoading) return <LoadingProgress />

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
          User Analytics
        </Typography>
      </Box>
      <ResponsiveContainer width='100%' height={480}>
        <PieChart>
          <Pie
            data={userCounts}
            dataKey='value'
            innerRadius='50%'
            outerRadius='60%'
            fill='#CCC'
            startAngle={225}
            endAngle={-45}
            paddingAngle={0}
            blendStroke
          >
            <Label
              content={<CustomLabel userCounts={userCounts} />}
              position='center'
            />
            <Cell key='todaysUserCount' fill='#82ca9d' />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default UserCountAnalytics
