import { Injectable } from '@nestjs/common'
import { CreateDoctorDto } from './dto/create-doctor.dto'
import { UpdateDoctorDto } from './dto/update-doctor.dto'

@Injectable()
export class DoctorsService {
  create(createDoctorDto: CreateDoctorDto) {
    return createDoctorDto
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
