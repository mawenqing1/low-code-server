import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { MongoRepository } from 'typeorm';
import { User } from '../entities/user.mongo.entity';
import { PaginationParamsDto } from 'src/shared/dtos/pagination-params.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly UserRepository: MongoRepository<User>
  ) {}
  async create(user: CreateUserDto) {
    return this.UserRepository.save(user);
  }

  async findAll({pageSize, page}: PaginationParamsDto): Promise<{data: User[], count: number}> {
    const [data, count] = await this.UserRepository.findAndCount({
      skip: pageSize * (page - 1),
      take: pageSize * 1,
      order: {
        name: 'DESC',
      },
      cache: true
    })
    return { data, count }
  }

  async findOne(id: number) {
    return this.UserRepository.findOneBy(id)
  }

  async update(id: number, user: CreateUserDto) {
    return this.UserRepository.update(id, user)
  }

  async remove(id: number) {
    return this.UserRepository.delete(id)
  }
}
