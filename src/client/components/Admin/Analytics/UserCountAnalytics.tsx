import React from 'react'
import { Box, Typography } from '@mui/material'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from 'recharts'

const UserCountAnalytics = () => {
  const data = [
    {
      name: 'today',
      value: 80,
    },
    {
      name: 'deltaAllTime',
      value: 10,
    },
  ]

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
            data={data}
            dataKey='value'
            innerRadius='50%'
            outerRadius='65%'
            fill='#CCC'
            startAngle={225}
            endAngle={-45}
            paddingAngle={0}
            blendStroke
          >
            <Label
              content={<Typography variant='h6'>{data[0].value}</Typography>}
              position='center'
            />
            <Cell key='test' fill='#82ca9d' />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default UserCountAnalytics
