import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiTags,
  ApiNoContentResponse,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiOkResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger'
import { AdministratorResponse } from 'src/common/swagger/classes/administrator.class'
import { GenericResponses } from 'src/common/decorators/genericResponses.decorator'
import { UpdateAdministratorDto } from './dto/update-administrator.dto'
import { Description } from 'src/common/swagger/description.swagger'
import { AdministratorService } from './administrator.service'
import { User } from 'src/user/entities/user.entity'
import { Auth, GetUser } from 'src/auth/decorators'
import { PaginationDto } from 'src/common/dtos'
import { fileFilter } from 'src/common/utils'
import { Roles } from 'src/user/enums'

@ApiTags('Administrator')
@Controller('administrator')
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) {}

  @Patch('upload/photo')
  @GenericResponses({ auth: true })
  @ApiNoContentResponse({
    description: 'No content'
  })
  @ApiOperation({
    summary: 'Upload a photo for the administrator',
    description: Description.administrator
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload',
    required: true,
    schema: {
      type: 'object',
      properties: {
        photo: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(
    FileInterceptor('photo', {
      fileFilter
    })
  )
  @Auth(Roles.ADMINISTRATOR)
  uploadPhoto(
    @UploadedFile()
    file: Express.Multer.File,
    @GetUser() user: User
  ) {
    return this.administratorService.uploadPhoto(file, user)
  }

  @Get('profile')
  @GenericResponses({ auth: true })
  @ApiOkResponse({
    description: 'Success',
    type: AdministratorResponse
  })
  @ApiOperation({
    summary: 'Get administrator profile using JWT token',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  getPatientProfile(@GetUser() user: User) {
    return this.administratorService.getAdministratorProfile(user)
  }

  @Get(':id')
  @GenericResponses({ auth: true })
  @ApiOkResponse({
    description: 'Success',
    type: AdministratorResponse
  })
  @ApiNotFoundResponse({
    description: 'Not Found'
  })
  @ApiOperation({
    summary: 'Find administrator by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR, Roles.DOCTOR)
  findById(@Param('id') id: string) {
    return this.administratorService.findById(id)
  }

  @Get()
  @GenericResponses({ auth: true })
  @ApiOkResponse({
    description: 'Success',
    type: [AdministratorResponse]
  })
  @ApiOperation({
    summary: 'Find all administrators',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  findAll(@Query() filterDto: PaginationDto) {
    return this.administratorService.findAll(filterDto)
  }

  @Patch()
  @GenericResponses({ auth: true })
  @ApiNoContentResponse({
    description: 'No content'
  })
  @ApiOperation({
    summary: 'Update administrator by using JWT token',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateByUserToken(
    @GetUser() user: User,
    @Body() updateAdministratorDto: UpdateAdministratorDto
  ) {
    const { id } = user
    return this.administratorService.updateById(id, updateAdministratorDto)
  }

  @Patch(':id')
  @GenericResponses({ auth: true })
  @ApiNoContentResponse({
    description: 'No content'
  })
  @ApiNotFoundResponse({
    description: 'Not Found'
  })
  @ApiOperation({
    summary: 'Update administrator by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: string,
    @Body() updateAdministratorDto: UpdateAdministratorDto
  ) {
    return this.administratorService.updateById(id, updateAdministratorDto)
  }

  @Delete(':id')
  @GenericResponses({ auth: true })
  @ApiNoContentResponse({
    description: 'No content'
  })
  @ApiNotFoundResponse({
    description: 'Not Found'
  })
  @ApiOperation({
    summary: 'Delete administrator by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.administratorService.deleteById(id)
  }
}
