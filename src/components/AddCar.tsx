import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'

import { Car } from '../types'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { addCar } from '../api/cars'

export const AddCar = () => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [car, setCar] = useState<Car>({
    brand: '',
    model: '',
    color: '',
    registrationNumber: '',
    modelYear: 0,
    price: 0,
  })

  const { mutate } = useMutation({
    mutationFn: addCar,
    onMutate: async (car: Car) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return car
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] })
    },
    onError: (error, car, context) => {
      console.error(
        'An error oStackccurred while adding the car',
        error,
        car,
        context,
      )
    },
  })

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCar({
      ...car,
      [event.target.name]: event.target.value,
    })
  }

  const handleSave = () => {
    mutate(car)
    setCar({
      brand: '',
      model: '',
      color: '',
      registrationNumber: '',
      modelYear: 0,
      price: 0,
    })
    handleClose()
  }
  return (
    <>
      <Button onClick={handleClickOpen}>New Car</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new car</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label='Brand'
              id='brand'
              name='brand'
              value={car.brand}
              onChange={handleChange}
            />
            <TextField
              label='Model'
              id='model'
              name='model'
              value={car.model}
              onChange={handleChange}
            />
            <TextField label='Color' type='text' id='color' name='color' />
            <TextField
              label='Registration Number'
              id='registrationNumber'
              name='registrationNumber'
              value={car.registrationNumber}
              onChange={handleChange}
            />
            <TextField
              label='Model Year'
              id='modelYear'
              name='modelYear'
              value={car.modelYear}
              onChange={handleChange}
            />

            <TextField
              label='Price'
              id='price'
              name='price'
              value={car.price}
              onChange={handleChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
