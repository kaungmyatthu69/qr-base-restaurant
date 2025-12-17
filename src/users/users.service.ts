import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTableDTO } from '../schemas/table/create-table.schema';
import { UpdateTableDTO } from '../schemas/table/update-table.schema';
import { CreateUserDTO } from '../schemas/user/create-user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
  async findOne(email: string) {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }

  async create(data: CreateUserDTO) {
    const { name, password, ...rest } = data;
    const existingUser = await this.prisma.user.findFirst({
      where: { name },
    });
    if (existingUser) {
      throw new BadRequestException('User with this username already exists.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        ...rest,
      },
    });
    const { password: _, ...result } = user;
    return result;
  }

  async update(id: number, data: UpdateTableDTO) {
    return this.prisma.table.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
