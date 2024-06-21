import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Specialty } from 'src/specialty/entities/specialty.entity'
import { CreateDoctorDto } from './dto/create-doctor.dto'
import { UpdateDoctorDto } from './dto/update-doctor.dto'
import { User } from 'src/user/entities/user.entity'
import { Doctor } from './entities/doctor.entity'

@Injectable()
export class DoctorRepository {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>
  ) {}

  async create(
    user: User,
    specialty: Specialty,
    createDoctorDto: CreateDoctorDto
  ): Promise<Doctor> {
    const doctorInstance = this.doctorRepository.create({
      user,
      specialty,
      ...createDoctorDto
    })

    const doctor = await this.doctorRepository.save(doctorInstance)

    return doctor
  }

  // repository is called by using the save method because
  // it is the only way to update the schedule property
  async updateByEntity(
    doctor: Doctor,
    updateDoctorDto: Partial<UpdateDoctorDto | Doctor>
  ) {
    await this.doctorRepository.save({ ...doctor, ...updateDoctorDto })
  }
}
