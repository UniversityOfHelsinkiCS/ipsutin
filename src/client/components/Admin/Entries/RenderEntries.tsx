import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Box, Button } from '@mui/material'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'

import { useEntries } from '../../../hooks/useEntry'
import { EntryWithSurvey, Survey } from '../../../types'

const RenderEntries = () => {
  const { t } = useTranslation()
  const { entries, isLoading } = useEntries()

  if (isLoading || !entries) return null

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
      renderCell: (cellValue: GridRenderCellParams<EntryWithSurvey>) => (
        <Button
          size='small'
          endIcon={<VisibilityIcon />}
          component={Link}
          to={`./view/${cellValue.value}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          {cellValue.value}
        </Button>
      ),
    },
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
      valueFormatter: ({ value }: { value: Date }) =>
        new Date(value).toLocaleString(),
    },
    {
      field: 'updatedAt',
      headerName: 'Updated',
      width: 250,
      valueFormatter: ({ value }: { value: Date }) =>
        new Date(value).toLocaleString(),
    },
    {
      field: 'sessionToken',
      headerName: 'Session identifier',
      width: 150,
    },
  ]

  return (
    <Box sx={{ mx: 2 }}>
      <Box sx={{ mt: 4, mx: 4, height: '75vh' }}>
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
        />
      </Box>
    </Box>
  )
}

export default RenderEntries
