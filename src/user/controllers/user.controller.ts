import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@Controller('user')
@ApiTags('用户管理')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly configService: ConfigService
  ) { }

  @Post()
  @ApiOperation({ summary: '创建用户' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateUserDto
  })
  create(@Body() createUserDto: CreateUserDto) {
    console.log(this.configService.get<string>('database.url'));
    
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: '查找所有用户' })
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async findAll(
    @Query() query: any
  ) {
    const { data, count } = await this.userService.findAll();
    return {
      data,
      count
    }
  }

  @ApiOperation({ summary: '查找单个用户' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      data: await this.userService.findOne(+id)
    }
  }

  @ApiOperation({ summary: '更新单个用户' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return {
      data: await this.userService.update(+id, updateUserDto)
    }
  }

  @ApiOperation({ summary: '删除单个用户' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
