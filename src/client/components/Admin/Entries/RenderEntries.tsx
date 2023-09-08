import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { EntryWithSurvey, Survey } from '@backend/types'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Box, Button } from '@mui/material'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'

import { useEntries } from '../../../hooks/useEntry'

const RenderEntries = () => {
  const { t } = useTranslation()
  const { entries, isLoading } = useEntries()

  if (isLoading || !entries) return null

  const columns = [
    {
      field: 'id',
      headerName: t('admin:entryViewID'),
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
      headerName: t('admin:entryViewSurvey'),
      width: 200,
      valueGetter: ({ value }: { value: Survey }) =>
        t(`surveyNames:${value.name}`),
    },
    {
      field: 'faculty',
      headerName: t('admin:entryViewFaculty'),
      width: 75,
      valueGetter: ({ row }: { row: EntryWithSurvey }) => row.data.faculty,
    },
    {
      field: 'createdAt',
      headerName: t('admin:entryViewCreated'),
      width: 175,
      valueFormatter: ({ value }: { value: Date }) =>
        new Date(value).toLocaleString(),
    },
    {
      field: 'updatedAt',
      headerName: t('admin:entryViewUpdated'),
      width: 175,
      valueFormatter: ({ value }: { value: Date }) =>
        new Date(value).toLocaleString(),
    },
    {
      field: 'sessionToken',
      headerName: t('admin:entryViewSessionToken'),
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
