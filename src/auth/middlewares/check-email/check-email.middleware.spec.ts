import { CheckEmailMiddleware } from './check-email.middleware'

describe('CheckEmailMiddleware', () => {
  it('should be defined', () => {
    expect(new CheckEmailMiddleware()).toBeDefined()
  })
})
