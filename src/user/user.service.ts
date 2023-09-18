import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SystemService } from 'src/shared/system.service';
import { MongoRepository } from 'typeorm';
import { User } from './entities/user.mongo.entity';
import { AppLogger } from 'src/shared/logger/logger.service';

@Injectable()
export class UserService {
  constructor(private readonly SystemService: SystemService,
    @Inject('USER_REPOSITORY')
    private readonly UserRepository: MongoRepository<User>,
    private readonly logger: AppLogger
  ) {
    this.logger.setContext(UserService.name);
  }
  create(createUserDto: CreateUserDto) {
    // console.log(this.SystemService.getEnv());

    this.logger.debug(null, 'hello debug', {a: 123})

    return this.UserRepository.save({
      name: 'haha',
    });
  }

  findAll() {
    return this.UserRepository.findAndCount({})
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
