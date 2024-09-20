import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCars, deleteCar } from '../api/cars'
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid'
import Snackbar from '@mui/material/Snackbar'
import ConfirmDialog from './ConfirmDialog'

export function Carlist() {
  const [openToast, setOpenToast] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [linkToDelete, setLinkToDelete] = useState('')

  const queryClient = useQueryClient()
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ['cars'],
    queryFn: getCars,
  })

  // After deleting, we should rerender the list of cars
  // So we use the useMutation hook to handle the delete operation
  const { mutate } = useMutation({
    mutationFn: deleteCar,
    onMutate: async (url: string) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return url
    },
    onSuccess: () => {
      setOpenToast(true)
      queryClient.invalidateQueries({ queryKey: ['cars'] })
    },
    onError: (error, url, context) => {
      console.error(
        'An error occurred while deleting the car',
        error,
        url,
        context,
      )
    },
  })

  const columns: GridColDef[] = [
    { field: 'brand', headerName: 'Brand', width: 150 },
    { field: 'model', headerName: 'Model', width: 150 },
    { field: 'color', headerName: 'Color', width: 150 },
    { field: 'modelYear', headerName: 'Model Year', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 },
    {
      field: 'delete',
      headerName: '',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params: GridCellParams) => (
        <button
          onClick={() => {
            setLinkToDelete(params.row._links.self.href)
            setOpenDeleteDialog(true)
          }}
        >
          Delete
        </button>
      ),
    },
  ]

  const handleCloseDialog = () => {
    setOpenDeleteDialog(false)
  }
  const handleConfirmAction = () => {
    if (linkToDelete) {
      mutate(linkToDelete)
    }
    setOpenDeleteDialog(false)
  }

  if (isLoading) {
    return <div>Loading...</div>
  } else if (isError) {
    return <div>Error when fetching cars... </div>
  } else if (isSuccess) {
    return (
      <>
        <DataGrid
          rows={data}
          columns={columns}
          disableRowSelectionOnClick={true}
          getRowId={(row) => row._links.self.href}
        />
        <ConfirmDialog
          open={openDeleteDialog}
          handleClose={handleCloseDialog}
          handleConfirm={handleConfirmAction}
          title='Are you sure delete the car?'
          message='Do you really want to perform this action?'
        />
        <Snackbar
          open={openToast}
          autoHideDuration={6000}
          onClose={() => setOpenToast(false)}
          message='Car deleted successfully'
        />
      </>
    )
  }
}
