import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
  Query
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UpdatePatientDto } from './dto/update-patient.dto'
import { User } from 'src/user/entities/user.entity'
import { Auth, GetUser } from 'src/auth/decorators'
import { PatientService } from './patient.service'
import { fileFilter } from 'src/common/utils'
import { Roles } from 'src/user/enums'
import { PaginationDto } from 'src/common/dtos'
import {
  ApiBody,
  ApiConsumes,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger'
import { Description } from 'src/common/swagger/description.swagger'
import { GenericResponses } from 'src/common/decorators/genericResponses.decorator'
import { PatientResponse } from 'src/common/swagger/classes/patient.class'

@ApiTags('Patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Patch('upload/photo')
  @GenericResponses({ auth: true })
  @ApiNoContentResponse({
    description: 'No content'
  })
  @ApiOperation({
    summary: 'Upload a photo for the patient',
    description: Description.patient
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
  @Auth(Roles.PATIENT)
  uploadPhoto(
    @UploadedFile()
    file: Express.Multer.File,
    @GetUser() user: User
  ) {
    return this.patientService.uploadPhoto(file, user)
  }

  @Get('profile')
  @GenericResponses({ auth: true })
  @ApiOkResponse({
    description: 'Success',
    type: PatientResponse
  })
  @ApiOperation({
    summary: 'Get patient profile using JWT token',
    description: Description.patient
  })
  @Auth(Roles.PATIENT)
  getPatientProfile(@GetUser() user: User) {
    return this.patientService.getPatientProfile(user)
  }

  @Get(':id')
  @GenericResponses({ auth: true })
  @ApiOkResponse({
    description: 'Success',
    type: PatientResponse
  })
  @ApiNotFoundResponse({
    description: 'Not Found'
  })
  @ApiOperation({
    summary: 'Find patient by id',
    description: Description.getAdministratorAndDoctor()
  })
  @Auth(Roles.ADMINISTRATOR, Roles.DOCTOR)
  findById(@Param('id') id: string) {
    return this.patientService.findById(id)
  }

  @Get()
  @GenericResponses({ auth: true })
  @ApiOkResponse({
    description: 'Success',
    type: [PatientResponse]
  })
  @ApiOperation({
    summary: 'Find all patients',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  findAll(@Query() filterDto: PaginationDto) {
    return this.patientService.findAll(filterDto)
  }

  @Patch()
  @GenericResponses({ auth: true })
  @ApiNoContentResponse({
    description: 'No content'
  })
  @ApiOperation({
    summary: 'Update patient by using JWT token',
    description: Description.patient
  })
  @Auth(Roles.PATIENT)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateByUserToken(
    @GetUser() user: User,
    @Body() updatePatientDto: UpdatePatientDto
  ) {
    const { id } = user
    return this.patientService.updateById(id, updatePatientDto)
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
    summary: 'Update patient by id',
    description: Description.administrator
  })
  @Auth(Roles.ADMINISTRATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.updateById(id, updatePatientDto)
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
  remove(@Param('id') id: string) {
    return this.patientService.deleteById(id)
  }
}
