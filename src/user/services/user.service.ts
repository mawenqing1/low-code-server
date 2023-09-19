import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { MongoRepository } from 'typeorm';
import { User } from '../entities/user.mongo.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly UserRepository: MongoRepository<User>
  ) {}
  async create(user: CreateUserDto) {
    return this.UserRepository.save(user);
  }

  async findAll(): Promise<{data: User[], count: number}> {
    const [data, count] = await this.UserRepository.findAndCount({})
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
