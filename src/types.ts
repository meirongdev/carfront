export type CarResponse = {
  id: number
  brand: string
  model: string
  color: string
  regisrationNumber: string
  modelYear: number
  description: string
  price: number
  _links: {
    self: {
      href: string
    }
    car: {
      href: string
    }
    owner: {
      href: string
    }
  }
}

export type Car = {
  brand: string
  model: string
  color: string
  registrationNumber: string
  modelYear: number
  price: number
}

export type CarEntry = {
  car: Car
  url: string
}
