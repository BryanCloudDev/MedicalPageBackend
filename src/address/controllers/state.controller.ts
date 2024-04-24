import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import { CreateStateDto } from '../dto/state/create-state.dto'
import { StateService } from '../service'
import { PaginationDto } from 'src/common/dtos'
import { UpdateStateDto } from '../dto/state/update-state.dto'
import { Auth } from 'src/auth/decorators'
import { Roles } from 'src/user/enums'

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}
  @Post()
  @Auth(Roles.ADMINISTRATOR)
  create(@Body() createCountryCodeDto: CreateStateDto) {
    return this.stateService.create(createCountryCodeDto)
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.stateService.findAll()
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.stateService.findById(id)
  }

  @Patch(':id')
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateById(@Param('id') id: string, @Body() updateStateDto: UpdateStateDto) {
    return this.stateService.updateById(id, updateStateDto)
  }

  @Delete(':id')
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id') id: string) {
    return this.stateService.deleteById(id)
  }
}
