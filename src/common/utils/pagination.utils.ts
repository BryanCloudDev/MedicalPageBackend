import { Repository } from 'typeorm'
import { BaseEntity } from '../entities'

export const pagination = async <T extends BaseEntity>({
  repository,
  skip,
  take
}: GenericFilterRequest<T>): Promise<PaginatedResponse<T>> => {
  const [result, total] = await repository.findAndCount({
    skip,
    take,
    where: { deletedOn: null }
  })

  const next =
    skip + take < total ? `?limit=${take}&offset=${skip + take}` : null
  const previous = skip > 0 ? `?limit=${take}&offset=${skip - take}` : null

  return {
    data: result,
    total,
    next,
    previous
  }
}

export interface GenericFilterRequest<T> {
  take: number
  skip: number
  repository: Repository<T>
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  next?: string
  previous?: string
}
