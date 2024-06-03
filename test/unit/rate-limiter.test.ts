import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { AppModule } from 'src/app.module'

describe('Rate Limiting', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should allow requests under the limit', async () => {
    for (let i = 1; i <= 100; i++) {
      await request(app.getHttpServer()).get('/ping').expect(HttpStatus.OK)
    }
  })

  it('should block requests over the limit', async () => {
    for (let i = 1; i < 110; i++) {
      const response = await request(app.getHttpServer()).get('/ping')

      console.log({
        i,
        status: response.status,
        message: response.body.message
      })

      if (i > 105) {
        expect(response.status).toBe(HttpStatus.TOO_MANY_REQUESTS)
        expect(response.body.message).toBe(
          'Too many requests from this IP, please try again later.'
        )
      } else {
        expect(response.status).toBe(HttpStatus.OK)
      }
    }
  })
})
