import { Injectable, Logger } from '@nestjs/common'
import { CreateDoctorDto } from './dto/create-doctor.dto'
import { UpdateDoctorDto } from './dto/update-doctor.dto'
import { Doctor } from './entities/doctor.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { exceptionHandler } from 'src/common/utils'
import { User } from 'src/user/entities/user.entity'
import { SpecialtyService } from 'src/specialty/specialty.service'

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    private readonly specialtyService: SpecialtyService
  ) {}

  private readonly logger = new Logger(DoctorService.name)

  async create(user: User, createDoctorDto: CreateDoctorDto) {
    const { jvpmNumber, specialtyId, officePhoneNumber } = createDoctorDto
    try {
      const specialty = await this.specialtyService.findById(specialtyId)

      const doctorInstance = this.doctorRepository.create({
        user,
        jvpmNumber,
        specialty,
        officePhoneNumber
      })

      const doctor = await this.doctorRepository.save(doctorInstance)

      return doctor
    } catch (error) {
      exceptionHandler(this.logger, error)
    }
  }

  findAll() {
    return `This action returns all doctors`
  }

  findOne(id: number) {
    return `This action returns a #${id} doctor`
  }

  async findByEmail(email: string) {
    return email
    // const patient = await this.patientRepository.findOneBy({ email })
    // return patient
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return updateDoctorDto
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`
  }
}
