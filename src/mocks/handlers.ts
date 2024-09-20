import { http, HttpResponse } from 'msw'
// mock backend response for testing
export const handlers = [
  http.get(`${import.meta.env.VITE_BACKEND_URL}/api/cars`, () => {
    return HttpResponse.json({
      _embedded: {
        cars: [
          {
            brand: 'Toyota',
            model: 'Camry',
            color: 'Black',
            registrationNumber: 'A1000',
            modelYear: 20000,
            price: 1000,
            _links: {
              self: {
                href: 'http://localhost:8080/api/cars/1',
              },
              car: {
                href: 'http://localhost:8080/api/cars/1',
              },
              owner: {
                href: 'http://localhost:8080/api/cars/1/owner',
              },
            },
          },
        ],
      },
      _links: {
        self: {
          href: 'http://localhost:8080/api/cars',
        },
        profile: {
          href: 'http://localhost:8080/api/profile/cars',
        },
        search: {
          href: 'http://localhost:8080/api/cars/search',
        },
      },
    })
  }),
]
