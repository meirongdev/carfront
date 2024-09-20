import axios from 'axios'
import { Car, CarEntry, CarResponse } from '../types'

export const getCars = async (): Promise<CarResponse[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/cars`,
  )
  return response.data._embedded.cars
}

export const deleteCar = async (url: string) => {
  const response = await axios.delete(url)
  return response.data
}

export const addCar = async (car: Car) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/cars`,
    car,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  return response.data
}

export const updateCar = async (carEntry: CarEntry) => {
  const response = await axios.put(carEntry.url, carEntry.car, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data
}
