import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
  Query
} from '@nestjs/common'
import { UpdateDoctorDto } from './dto/update-doctor.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { User } from 'src/user/entities/user.entity'
import { Auth, GetUser } from 'src/auth/decorators'
import { DoctorService } from './doctor.service'
import { PaginationDto } from 'src/common/dtos'
import { fileFilter } from 'src/common/utils'
import { Roles } from 'src/user/enums'
import {
  ApiBody,
  ApiConsumes,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger'
import { GenericResponses } from 'src/common/decorators/genericResponses.decorator'
import { Description } from 'src/common/swagger/description.swagger'
import { DoctorResponse } from 'src/common/swagger/classes/doctor.class'

@ApiTags('Doctor')
@Controller('doctor')
export class DoctorsController {
  constructor(private readonly doctorService: DoctorService) {}

  @Patch('upload/profile-photo')
  @GenericResponses({ auth: true })
  @ApiNoContentResponse({
    description: 'No content'
  })
  @ApiOperation({
    summary: 'Upload a photo for the doctor',
    description: Description.doctor
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
  @Auth(Roles.DOCTOR)
  uploadPhoto(
    @UploadedFile()
    file: Express.Multer.File,
    @GetUser() user: User
  ) {
    return this.doctorService.uploadPhoto(file, user)
  }

  @Get('profile')
  @GenericResponses({ auth: true })
  @ApiOkResponse({
    description: 'Success',
    type: [DoctorResponse]
  })
  @ApiOperation({
    summary: 'Get doctor profile using JWT token',
    description: Description.doctor
  })
  @Auth(Roles.DOCTOR)
  getDoctorProfile(@GetUser() user: User) {
    return this.doctorService.getDoctorProfile(user)
  }

  @Get()
  @GenericResponses()
  @ApiOkResponse({
    description: 'Success',
    type: [DoctorResponse]
  })
  @ApiOperation({
    summary: 'Find all doctors'
  })
  findAll(@Query() query: PaginationDto) {
    return this.doctorService.findAll(query)
  }

  @Get(':id')
  @GenericResponses()
  @ApiNotFoundResponse({
    description: 'Not Found'
  })
  @ApiOkResponse({
    type: DoctorResponse
  })
  @ApiOperation({
    summary: 'Find doctor by id'
  })
  @Auth()
  findById(@Param('id') id: string) {
    return this.doctorService.findById(id)
  }

  @Patch()
  @GenericResponses({ auth: true })
  @ApiNoContentResponse({
    description: 'No content'
  })
  @ApiOperation({
    summary: 'Update doctor by using JWT token',
    description: Description.doctor
  })
  @Auth(Roles.DOCTOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateByUserToken(
    @GetUser() user: User,
    @Body() updateDoctorDto: UpdateDoctorDto
  ) {
    const { id } = user
    return this.doctorService.updateById(id, updateDoctorDto)
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
    summary: 'Update doctor by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateById(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto
  ) {
    return this.doctorService.updateById(id, updateDoctorDto)
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
    summary: 'Delete doctor by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteById(@Param('id') id: string) {
    return this.doctorService.deleteById(id)
  }
}
