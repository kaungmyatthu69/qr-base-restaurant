import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDTO } from '../schemas/user/create-user.schema';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll() {
    return this.usersRepository.findAll();
  }

  async findById(id: number) {
    return this.usersRepository.findById(id);
  }

  async findOne(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async create(data: CreateUserDTO) {
    const { name, password, ...rest } = data;
    const existingUser = await this.usersRepository.findOne({
      where: { name },
    });
    if (existingUser) {
      throw new BadRequestException('User with this username already exists.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersRepository.create({
      name,
      password: hashedPassword,
      ...rest,
    });
    const { password: _, ...result } = user;
    return result;
  }

  async update(id: number, data: any) {
    return this.usersRepository.update(id, data);
  }

  async delete(id: number) {
    return this.usersRepository.delete(id);
  }
}
