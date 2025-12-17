import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTableDTO } from '../schemas/table/create-table.schema';
import { UpdateTableDTO } from '../schemas/table/update-table.schema';

@Injectable()
export class TablesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.table.findMany();
  }

  async findById(id: number) {
    return this.prisma.table.findUnique({
      where: { id },
    });
  }

  async create(data: CreateTableDTO) {
    return this.prisma.table.create({
      data,
    });
  }

  async update(id: number, data: UpdateTableDTO) {
    return this.prisma.table.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.table.delete({
      where: { id },
    });
  }
}
