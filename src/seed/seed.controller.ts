import { Controller, Get } from '@nestjs/common'
import { SeedService } from './seed.service'
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { GenericResponses } from 'src/common/decorators/genericResponses.decorator'
import { Description } from 'src/common/swagger/description.swagger'

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @GenericResponses({ auth: true })
  @ApiCreatedResponse({
    description: 'Created'
  })
  @ApiOperation({
    summary: 'Seed database with initial data for app to run',
    description: Description.administrator
  })
  // @Auth(Roles.ADMINISTRATOR)
  findAll() {
    return this.seedService.runSeed()
  }
}
