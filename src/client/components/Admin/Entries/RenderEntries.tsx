import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Box, Button } from '@mui/material'
// eslint-disable-next-line import/no-extraneous-dependencies
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid'

import { useEntries } from '../../../hooks/useEntry'
import { Survey } from '../../../types'

const RenderEntries = () => {
  const { t } = useTranslation()
  const { entries, isLoading } = useEntries()
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>()

  if (isLoading || !entries) return null

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
      {rowSelectionModel && (
        <Button
          component={Link}
          to={`./view/${rowSelectionModel[0]}`}
          sx={{
            position: 'absolute',
            top: '120px',
            right: 0,
            mr: 6,
            alignSelf: 'center',
          }}
          variant='contained'
          onClick={() => {}}
        >
          {t('admin:viewSelectedEntry')}
        </Button>
      )}
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
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel)
          }}
        />
      </Box>
    </Box>
  )
}

export default RenderEntries
