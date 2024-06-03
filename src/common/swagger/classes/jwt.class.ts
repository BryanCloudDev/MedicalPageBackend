import { ApiProperty } from '@nestjs/swagger'

export class JWTResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRmZmQyMzQwLWQ5YjktNDYwYi1hMmRkLWZjMjM0NzI0ZjUyYyIsInJvbGVzIjpbIkFETUlOIiwiUEFUSUVOVCJdLCJpYXQiOjE2MjM2NzY5NzIsImV4cCI6MTYyMzY3NzA3Mn0.1f9Vz1V5JZUzF5wQ8v4VJvJ9J0JwH2qV6j5uNv1q7ZI',
    description: 'JWT token'
  })
  token: string
}
