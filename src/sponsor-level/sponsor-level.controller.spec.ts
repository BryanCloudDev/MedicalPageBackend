import { Test, TestingModule } from '@nestjs/testing'
import { SponsorLevelController } from './sponsor-level.controller'
import { SponsorLevelService } from './sponsor-level.service'

describe('SponsorLevelController', () => {
  let controller: SponsorLevelController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SponsorLevelController],
      providers: [SponsorLevelService]
    }).compile()

    controller = module.get<SponsorLevelController>(SponsorLevelController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
