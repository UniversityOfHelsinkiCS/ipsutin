import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import { useEntries } from '../../../hooks/useEntry'
import { Survey } from '../../../types'

const RenderEntries = () => {
  const { t } = useTranslation()
  const { entries, isLoading } = useEntries()

  if (isLoading || !entries) return null

  // console.log(entries)

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'Survey',
      headerName: 'Survey',
      width: 300,
      valueGetter: ({ value }: { value: Survey }) =>
        t(`surveyNames:${value.name}`),
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 250,
    },
    {
      field: 'updatedAt',
      headerName: 'Updated',
      width: 250,
    },
    {
      field: 'sessionToken',
      headerName: 'Session identifier',
      width: 150,
    },
  ]

  return (
    <Box sx={{ mx: 2, mt: 8 }}>
      <Box sx={{ my: 4 }}>
        <Typography sx={{ my: 4, pl: 1 }} variant='h4'>
          {t('admin:entriesTitle')}
        </Typography>
      </Box>
      <Box sx={{ mt: 4, mx: 4 }}>
        <DataGrid
          rows={entries}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  )
}

export default RenderEntries
