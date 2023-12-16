import { Test, TestingModule } from '@nestjs/testing'
import { SponsorLevelService } from './sponsor-level.service'

describe('SponsorLevelService', () => {
  let service: SponsorLevelService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SponsorLevelService]
    }).compile()

    service = module.get<SponsorLevelService>(SponsorLevelService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
