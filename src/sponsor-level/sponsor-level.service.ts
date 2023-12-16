import { Injectable } from '@nestjs/common'
import { CreateSponsorLevelDto } from './dto/create-sponsor-level.dto'
import { UpdateSponsorLevelDto } from './dto/update-sponsor-level.dto'

@Injectable()
export class SponsorLevelService {
  create(createSponsorLevelDto: CreateSponsorLevelDto) {
    return 'This action adds a new sponsorLevel'
  }

  findAll() {
    return `This action returns all sponsorLevel`
  }

  findOne(id: number) {
    return `This action returns a #${id} sponsorLevel`
  }

  update(id: number, updateSponsorLevelDto: UpdateSponsorLevelDto) {
    return `This action updates a #${id} sponsorLevel`
  }

  remove(id: number) {
    return `This action removes a #${id} sponsorLevel`
  }
}
